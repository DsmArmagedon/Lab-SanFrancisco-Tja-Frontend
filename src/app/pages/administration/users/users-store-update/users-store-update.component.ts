import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMAGES } from 'src/app/config';
import bsCustomFileInput from 'bs-custom-file-input';
import { ValidationsUserDirective } from 'src/app/directives/validations-user.directive';
import { ValidatorsPattern } from 'src/app/validators/validators-pattern';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { STORE, UPDATE } from 'src/app/global-variables';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';
import { CompanyPosition } from 'src/app/models/company-position.model';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from 'src/app/services/role.service';
import { CompanyPositionService } from 'src/app/services/company-position.service';
import { GeneralService } from 'src/app/services/general.service';
@Component({
  selector: 'app-users-store-update',
  templateUrl: './users-store-update.component.html',
  providers: [ValidationsUserDirective]
})
export class UsersStoreUpdateComponent implements OnInit, OnDestroy {
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
  txtStatusSecUser: string;

  // Misc
  loadUser: boolean = true;
  loadRoles: boolean = true;
  loadCompanyPositions: boolean = true;
  initialState: any;

  private onDestroy = new Subject();

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
        validators: [Validators.required, Validators.minLength(7), Validators.maxLength(50)],
        asyncValidators: [
          this.validationsDirective.validateUniqueCi()
        ]
      }),
      username: new FormControl('', {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(15), ValidatorsPattern.usernameFormatPattern],
        asyncValidators: [
          this.validationsDirective.validateUniqueUsername()
        ]
      }),
      first_name: new FormControl('', [Validators.required, Validators.maxLength(100), ValidatorsPattern.alphaSpacePattern]),
      last_name: new FormControl('', [Validators.required, Validators.maxLength(100), ValidatorsPattern.alphaSpacePattern]),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email, Validators.maxLength(150)],
        asyncValidators: [
          this.validationsDirective.validateUniqueEmail()
        ]
      }),
      job_title: new FormControl('', [Validators.maxLength(100)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      status: new FormControl(1),
      role_id: new FormControl(null, [Validators.required]),
      company_position_id: new FormControl(null, [Validators.required])
    },
      {
        updateOn: 'blur'
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
    this.txtStatusSecUser = this.initialState.txtLoad;
    this.getIdToParameterFromUrl();
    this.loadUser = false;
    this.userService.editShowUsers(this.idUser)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadUser = true)
      )
      .subscribe(
        resp => {
          this.user = resp;
          this.addIfRoleOrCompanyPositionIsFalse();
          this.assignValuesFormUser();
        },
        () => {
          this.toastr.error('Consulte con el Administrador', 'Error al mostrar el formulario para Actualizar el Usuario');
          this.router.navigate(['administration/users/index']);
        }
      );
  }

  addIfRoleOrCompanyPositionIsFalse(): void {
    !this.user.role.status && this.rolesDB.push(this.user.role);
    !this.user.companyPosition.status && this.companyPositionsDB.push(this.user.companyPosition);
  }

  saveFormUser(): void {
    this.loadUser = false;

    if (this.formUser.valid) {
      this.user = Object.assign(new User, this.formUser.value);
      if (this.loadImage) {
        this.user.image = this.loadImage;
      }
      (!this.formUser.value.id) ? this.storeForm() : this.updateForm();
    }
  }

  storeForm(): void {
    this.txtStatusSecUser = 'Guardando Usuario';
    this.userService.storeUsers(this.user)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadUser = true)
      )
      .subscribe(
        resp => {
          this.resetFormUser();
          this.toastr.success(this.titleCasePipe.transform(resp.fullName), 'USUARIO Creado Correctamente!');
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al crear: USUARIO.')
      ).add(
        () => this.loadUser = true
      )
  }

  updateForm(): void {
    this.txtStatusSecUser = 'Actualizando Usuario';

    this.userService.updateUsers(this.user)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadUser = true)
      )
      .subscribe(
        resp => {
          this.toastr.success(this.titleCasePipe.transform(resp.fullName), 'USUARIO Actualizado Correctamente');
          this.router.navigate(['administration/users/index']);
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: USUARIO.')
      );
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
    this.roleService.listRoles()
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadRoles = true)
      ).subscribe(
        resp => this.rolesDB = resp,
        () => this.toastr.error('Consulte con el Administrador', 'Error al cargar los ROLES')
      );
  }

  loadCompanyPositionsForm(): void {
    this.loadCompanyPositions = false;
    this.companyPositionService.listCompanyPositions()
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadCompanyPositions = true)
      )
      .subscribe(
        resp => this.companyPositionsDB = resp,
        () => this.toastr.error('Consulte con el Administrador', 'Error al cargar los CARGOS')
      );
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
    this.urlImage = IMAGES.original
  }

  getIdToParameterFromUrl(): void {
    this.route.paramMap.subscribe(
      params => this.idUser = params.get('ci')
    );
  }

  ngOnDestroy() {
    if (this.initialState.type == UPDATE) this.gralService.changeDisabled(true);
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
