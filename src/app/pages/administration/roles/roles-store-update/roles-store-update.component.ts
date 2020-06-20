import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { PermissionService } from '../../../../services/permission/permission.service';
import { RoleService } from '../../../../services/role/role.service';
import { forkJoin } from 'rxjs';
import { Role } from 'src/app/models/role.model';
import { ToastrService } from 'ngx-toastr';
import { ValidationCheckboxRequired } from 'src/app/validators/validators-array-required';
import { ValidatorsPattern } from '../../../../validators/validators-pattern';
import { ValidationsNameDirective } from 'src/app/directives/validations-name.directive';
import { STORE, UPDATE } from '../../../../global-variables';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/common/general.service';

@Component({
  selector: 'app-roles-store-update',
  templateUrl: './roles-store-update.component.html',
  providers: [ValidationsNameDirective]
})
export class RolesStoreUpdateComponent implements OnInit, OnDestroy {
  formRole: FormGroup;
  formPermission: FormGroup;
  idRole: number;
  permissionsDB: any = [];
  role: Role;
  loadPage: boolean = true;
  loadPagePermission: boolean = true;

  savePermissions: Array<number> = [];

  txtLoad: string;
  txtLoadPermissions: string;

  initialState: any;

  isAccordionPermissionsOpen: boolean;


  constructor(private permissionService: PermissionService,
    private roleService: RoleService,
    private validationsDirective: ValidationsNameDirective,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    public gralService: GeneralService) {
  }

  ngOnInit() {

    this.formRole = this.formGroupRole();
    this.initialState = this.gralService.getDataInitialState(this.route);
    this.selectTypeFormStoreOrUpdate();
  }

  get id() { return this.formRole.get('id'); }
  get name() { return this.formRole.get('name'); }
  get description() { return this.formRole.get('description'); }
  get status() { return this.formRole.get('status'); }
  get permissions() { return this.formRole.get('permissions') as FormArray; }

  formGroupRole(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100), ValidatorsPattern.alphaSpacePattern],
        asyncValidators: [this.validationsDirective.validateUniqueRole.bind(this.validationsDirective)]
      }),
      description: new FormControl('', {
        validators: [Validators.maxLength(255)],
      }),
      status: new FormControl(1),
      permissions: new FormArray([], {
        validators: [ValidationCheckboxRequired]
      }),
    });
  }

  assignValuesFormRole(): void {
    this.id.setValue(this.role.id);
    this.name.setValue(this.role.name);
    this.description.setValue(this.role.description);
    this.status.setValue(this.role.status);
    this.setValuePermissions();
  }

  setValuePermissions(): void {
    this.role.permissions.map((e) => {
      // Buscamos el index en el permissionsDB de los permisos que se recibieron del backend del rol, seleccionado.
      // const permissionSearch = this.permissionsDB.findIndex((element) => {
      //   return element.slug === e.slug;
      // })
      this.permissionsDB.map(resource => {
        const permissionSearch = resource.permissions.find(permission => permission.slug === e.slug)
        if (permissionSearch) {
          // En base al index obtenido, le damos un valor de checked al controls permissions
          this.permissions.controls[permissionSearch.index].setValue(true);
        }
      });
    })
  }

  getStore(): void {
    this.txtLoadPermissions = this.initialState.txtLoad;
    this.loadPagePermission = false;
    this.permissionService.listPermissions().subscribe(
      resp => {
        this.permissionsDB = resp;
        this.addPermissions();
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al mostrar el formulario para Crear Rol.')
    ).add(
      () => this.loadPagePermission = true
    );
  }

  getUpdate(): void {
    this.txtLoad = this.initialState.txtLoad;
    this.getIdToParameterFromUrl();
    this.loadPage = false;
    forkJoin({
      permissions: this.permissionService.listPermissions(),
      role: this.roleService.editShowRoles(this.idRole)
    }).subscribe(
      resp => {
        this.permissionsDB = resp.permissions;
        this.addPermissions();
        this.role = resp.role;
        this.assignValuesFormRole();
      },
      () => {
        this.toastr.error('Consulte con el Administrador.', 'Error al mostrar el formulario para Actualizar Rol.');
        this.router.navigate(['administration/roles/index']);
      }
    ).add(
      () => this.loadPage = true
    );
  }

  saveFormRole(): void {
    this.getIdPermissionsForSave();
    if (this.formRole.valid) {
      let roleData: Role = this.formRole.value;
      roleData.permissions = undefined; // Elimina enviar datos innecesarios al backend
      roleData.permissions_id = this.savePermissions;
      this.loadPage = false;
      if (!this.formRole.value.id && this.initialState.type == STORE) {
        this.storeForm(roleData);
      } else {
        this.updateForm(roleData);
      }
    }
  }

  getIdPermissionsForSave(): void {
    this.permissions.value.map((checked, index) => {
      if (checked) {
        this.permissionsDB.map(resource => {
          resource.permissions.map(permission => {
            if (permission.index === index) {
              this.savePermissions.push(permission.id);
            }
          })
        })
      }
    });
  }

  storeForm(roleData: Role): void {
    this.txtLoad = 'Guardando Rol';
    this.roleService.storeRoles(roleData).subscribe(
      resp => {
        this.resetFormRole();
        this.toastr.success(resp.name.toUpperCase(), 'ROL Creado Correctamente');
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al crear: ROL.')
    ).add(
      () => this.loadPage = true
    );
  }

  updateForm(roleData: Role): void {
    this.txtLoad = 'Actualizando Rol';
    this.roleService.updateRoles(roleData).subscribe(
      resp => {
        this.toastr.success(resp.name.toUpperCase(), 'ROL Actualizado Correctamente');
        this.router.navigate(['administration/roles/index']);
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: ROL.')
    ).add(
      () => this.loadPage = true
    );
  }

  selectTypeFormStoreOrUpdate(): void {
    switch (this.initialState.type) {
      case STORE:
        this.gralService.changeSelectBtn(STORE);
        this.getStore();
        break;
      case UPDATE:
        this.gralService.changeDisabled(false);
        this.gralService.changeSelectBtn(UPDATE);
        this.getUpdate();
        break;
    }
  }

  resetFormRole(): void {
    this.isAccordionPermissionsOpen = false;
    this.formRole.reset();
    this.status.setValue(1);
  }

  selectAll(): void {
    this.permissions.value.map((checked, index) => {
      if (!checked) {
        this.permissions.controls[index].setValue(true);
      }
    });
  }

  deselectAll(): void {
    this.permissions.value.map((checked, index) => {
      if (checked) {
        this.permissions.controls[index].setValue(false);
      }
    });
  }

  addPermissions() {
    for (var i = 0; i <= 47; i++) {
      const formControl = new FormControl(false)
      this.permissions.push(formControl);
    }
  }
  addPermission(i: number) {
    console.log(i);
  }
  getIdToParameterFromUrl(): void {
    this.route.paramMap.subscribe(
      params => this.idRole = parseInt(params.get('id'))
    );
  }

  ngOnDestroy() {
    if (this.initialState.type == UPDATE) {
      this.gralService.changeDisabled(true);
    }
  }

  verificar(value: any) {
    console.log(value);
  }

}
