import { CompanyPosition } from './../../../../models/company-position.model';
import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../../services/role/role.service';
import { CompanyPositionService } from '../../../../services/company-position/company-position.service';
import { UserService } from '../../../../services/user/user.service';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMAGES } from '../../../../config';
import { Role } from 'src/app/models/role.model';
import bsCustomFileInput from 'bs-custom-file-input';
import { ValidationsUserDirective } from '../../../../directives/validations-user.directive';
import { ValidatorsPattern } from '../../../../validators/validators-pattern';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { STORE, UPDATE } from 'src/app/global-variables';
import { GeneralService } from 'src/app/services/common/general.service';
@Component({
  selector: 'app-users-store-update',
  templateUrl: './users-store-update.component.html',
  providers: [ValidationsUserDirective]
})
export class UsersStoreUpdateComponent implements OnInit {
  public rolesDB: Role[] = [];
  public companyPositionsDB: CompanyPosition[] = [];
  // User
  formUser: FormGroup;
  user: User = new User;
  idUser: string;

  // Imagen
  urlImage: string;
  loadImage: any;
  tmpImage: string | ArrayBuffer;


  // Init Component
  txtLoad: string;

  // Misc
  loadPage: boolean = true;
  loadRoles: boolean = true;
  loadCompanyPositions: boolean = true;
  optionModal: boolean;
  initialState: any;

  constructor(private roleService: RoleService,
    private companyPositionService: CompanyPositionService,
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private validationsDirective: ValidationsUserDirective,
    private titleCasePipe: TitleCasePipe,
    private router: Router,
    public gralService: GeneralService) {
    this.urlImage = IMAGES.original // Carga imagen por defecto para crear usuarios
    this.optionModal = false; // Bandera que determina que al cerrar el componente modal con onHide, solo se ejecute el index si se actualiza o guarda.
  }
  ngOnInit() {
    bsCustomFileInput.init()
    this.formUser = this.formGroupUser();
    this.initialState = this.gralService.getDataInitialState(this.route);
    this.loadRolesForm();
    this.loadCompanyPositionsForm();
    this.selectTypeFormStoreOrUpdate();
  }

  get id() { return this.formUser.get('id'); }
  get ci() { return this.formUser.get('ci'); }
  get username() { return this.formUser.get('username'); }
  get first_name() { return this.formUser.get('first_name'); }
  get last_name() { return this.formUser.get('last_name'); }
  get email() { return this.formUser.get('email'); }
  get job_title() { return this.formUser.get('job_title'); }
  get address() { return this.formUser.get('address'); }
  get phone() { return this.formUser.get('phone'); }
  get status() { return this.formUser.get('status'); }
  get role_id() { return this.formUser.get('role_id'); }
  get company_position_id() { return this.formUser.get('company_position_id'); }

  formGroupUser(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      ci: new FormControl('', {
        validators: [Validators.required, Validators.minLength(7), Validators.maxLength(20)],
        asyncValidators: [
          this.validationsDirective.validateCi.bind(this.validationsDirective)
        ]
      }),
      username: new FormControl('', {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(15), ValidatorsPattern.usernameFormatPattern],
        asyncValidators: [
          this.validationsDirective.validateUsername.bind(this.validationsDirective)
        ]
      }),
      first_name: new FormControl('', [Validators.required, Validators.maxLength(180), ValidatorsPattern.alphaSpacePattern]),
      last_name: new FormControl('', [Validators.required, Validators.maxLength(180), ValidatorsPattern.alphaSpacePattern]),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email, Validators.maxLength(180)],
        asyncValidators: [
          this.validationsDirective.validateEmail.bind(this.validationsDirective)
        ]
      }),
      job_title: new FormControl('', [Validators.maxLength(150)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(180)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      status: new FormControl(1),
      role_id: new FormControl(null, [Validators.required]),
      company_position_id: new FormControl(null, [Validators.required])
    });
  }

  assignValuesFormUser(): void {
    this.id.setValue(this.user.ci);
    this.ci.setValue(this.user.ci);
    this.username.setValue(this.user.username);
    this.first_name.setValue(this.user.first_name);
    this.last_name.setValue(this.user.last_name);
    this.email.setValue(this.user.email);
    this.job_title.setValue(this.user.job_title);
    this.address.setValue(this.user.address);
    this.phone.setValue(this.user.phone);
    this.status.setValue(this.user.status);
    this.role_id.setValue(this.user.role.id);
    this.company_position_id.setValue(this.user.companyPosition.id);
    this.tmpImage = this.user.images.original;
  }

  getUpdate(): void {
    this.txtLoad = this.initialState.txtLoad;
    this.getIdToParameterFromUrl();
    this.loadPage = false;
    this.userService.editShowUsers(this.idUser).subscribe(
      resp => {
        this.user = resp;
        this.assignValuesFormUser();
      },
      () => {
        this.toastr.error('Consulte con el Administrador', 'Error al mostrar el formulario para Actualizar el Usuario');
        this.router.navigate(['administration/users/index']);
      }
    ).add(
      () => this.loadPage = true
    );
  }

  saveFormUser(): void {
    this.loadPage = false;

    if (this.formUser.valid) {
      let userData: User = this.formUser.value;
      if (this.loadImage) {
        userData.image = this.loadImage;
      }
      if (!this.formUser.value.id && this.initialState.type == STORE) {
        this.storeForm(userData);
      } else {
        this.updateForm(userData);
      }
    }
  }

  storeForm(userData: User): void {
    this.txtLoad = 'Guardando Usuario';
    this.userService.storeUsers(userData).subscribe(
      resp => {
        this.resetFormUser();
        this.urlImage = IMAGES.original
        this.responseSaveFormUser(resp, 'USUARIO Creado Correctamente!');
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al crear: USUARIO.')
    ).add(
      () => this.loadPage = true
    )
  }

  updateForm(userData: User): void {
    this.txtLoad = 'Actualizando Usuario';

    this.userService.updateUsers(userData).subscribe(
      resp => {
        this.responseSaveFormUser(resp, 'USUARIO Actualizado Correctamente');
        this.router.navigate(['administration/users/index']);
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: USUARIO.')
    ).add(
      () => this.loadPage = true
    )
  }

  selectTypeFormStoreOrUpdate(): void {
    switch (this.initialState.type) {
      case STORE:
        this.gralService.changeSelectBtn(STORE);
        break;
      case UPDATE:
        this.gralService.changeDisabled(false);
        this.gralService.changeSelectBtn(UPDATE);
        this.getUpdate();
        break;
    }
  }

  loadRolesForm(): void {
    this.loadRoles = false;
    this.roleService.listRoles().subscribe(
      resp => this.rolesDB = resp,
      () => this.toastr.error('Consulte con el Administrador', 'Error al cargar los ROLES')
    ).add(
      () => this.loadRoles = true
    );
  }

  loadCompanyPositionsForm(): void {
    this.loadCompanyPositions = false;
    this.companyPositionService.listCompanyPositions().subscribe(
      resp => this.companyPositionsDB = resp,
      () => this.toastr.error('Consulte con el Administrador', 'Error al cargar los CARGOS')
    ).add(
      () => this.loadCompanyPositions = true
    );
  }

  responseSaveFormUser(user: User, title: string): void {
    this.optionModal = true;
    let fullName = `${user.first_name} ${user.last_name}`;
    this.toastr.success(this.titleCasePipe.transform(fullName), title);
  }

  selectImage(file: File) {
    if (!file) {
      this.loadImage = null;
      return;
    }

    if (file.type.indexOf('image/jpeg') < 0) {
      this.loadImage = null;
      return;
    }

    this.loadImage = file;

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.tmpImage = reader.result;

  }

  resetFormUser(): void {
    this.formUser.reset();
    this.status.setValue(1);
  }

  getIdToParameterFromUrl(): void {
    this.route.paramMap.subscribe(
      params => this.idUser = params.get('ci')
    );
  }

  ngOnDestroy() {
    if (this.initialState.type == UPDATE) {
      this.gralService.changeDisabled(true);
    }
  }
}
