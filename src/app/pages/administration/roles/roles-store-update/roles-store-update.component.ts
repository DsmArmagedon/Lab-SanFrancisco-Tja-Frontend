import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { PermissionService } from '../../../../services/permission/permission.service';
import { RoleService } from '../../../../services/role/role.service';
import { forkJoin, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ValidationCheckboxRequired } from 'src/app/validators/validators-array-required';
import { ValidatorsPattern } from '../../../../validators/validators-pattern';
import { ValidationsNameDirective } from 'src/app/directives/validations-name.directive';
import { STORE, UPDATE, INDEX } from '../../../../global-variables';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/common/general.service';
import { Permission } from 'src/app/models/permission/permission.model';
import { takeUntil, finalize } from 'rxjs/operators';
import { Role } from 'src/app/models/role/role.model';

@Component({
  selector: 'app-roles-store-update',
  templateUrl: './roles-store-update.component.html',
  providers: [ValidationsNameDirective]
})
export class RolesStoreUpdateComponent implements OnInit, OnDestroy {
  formRole: FormGroup;
  idRole: number;
  permissionsDB: any = [];
  role: Role;
  loadRole: boolean = true;
  loadPermissions: boolean = true;

  savePermissions: Array<number> = [];

  txtStatusSecRole: string;
  txtStatusSecPermissions: string;

  initialState: any;

  isAccordionPermissionsOpen: boolean;

  private onDestroy = new Subject();

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
        asyncValidators: [this.validationsDirective.validateUniqueRole()]
      }),
      description: new FormControl('', {
        validators: [Validators.maxLength(255)],
      }),
      status: new FormControl(1),
      permissions: new FormArray([], {
        validators: [ValidationCheckboxRequired]
      })
    }, {
      updateOn: 'blur'
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
    this.role.permissions.forEach(e => {
      // Recorremos el Array Asociativo de cada propiedad
      for (const resource in this.permissionsDB) {
        // Buscamos el permiso en la lista de permisos del rol para obtener el index posteriormente
        const permissionSearch = this.permissionsDB[resource].permissions.find(permission => permission.slug === e.slug);
        if (permissionSearch) {
          this.permissions.controls[permissionSearch.index].setValue(true);
        }
      }
    })
    for (const resource in this.permissionService.objectListPermissions) {
      this.getSelectPermissions(resource);
    }
  }

  getSelectPermissions(resource: string) {
    let select: number = 0;
    this.permissionService.objectListPermissions[resource].permissions.forEach(permission => {
      if (this.permissions.controls[permission.index].value) {
        select++;
      }
    });
    this.permissionService.objectListPermissions[resource].select = select;
  }

  getStore(): void {
    this.txtStatusSecRole = this.initialState.txtLoad;
    this.loadPermissions = false;
    this.permissionService.listPermissions()
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadPermissions = true)
      ).subscribe(
        resp => {
          this.permissionsDB = resp;
          this.addPermissions();
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al mostrar el formulario para Crear Rol.')
      );
  }

  getUpdate(): void {
    this.txtStatusSecRole = this.initialState.txtLoad;
    this.getIdToParameterFromUrl();
    this.loadRole = false;
    forkJoin({
      permissions: this.permissionService.listPermissions(),
      role: this.roleService.editShowRoles(this.idRole)
    })
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadRole = true)
      )
      .subscribe(
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
      );
  }

  saveFormRole(): void {
    if (this.formRole.valid) {
      this.getIdPermissionsForSave();
      this.role = Object.assign(new Role, this.formRole.value);
      this.role.permissions_id = this.savePermissions;
      this.loadRole = false;
      (!this.formRole.value.id) ? this.storeForm() : this.updateForm();
    }
  }

  getIdPermissionsForSave(): void {
    this.permissions.value.map((checked, index) => {
      if (checked) {
        for (const resource in this.permissionsDB) {
          this.permissionsDB[resource].permissions.map(permission => {
            if (permission.index === index) {
              this.savePermissions.push(permission.id);
            }
          })
        }
      }
    });
  }

  storeForm(): void {
    this.txtStatusSecRole = 'Guardando Rol';
    this.roleService.storeRoles(this.role)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadRole = true)
      )
      .subscribe(
        resp => {
          this.resetFormRole();
          this.toastr.success(resp.name.toUpperCase(), 'ROL Creado Correctamente');
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al crear: ROL.')
      );
  }

  updateForm(): void {
    this.txtStatusSecRole = 'Actualizando Rol';
    this.roleService.updateRoles(this.role)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadRole = true)
      )
      .subscribe(
        resp => {
          this.toastr.success(resp.name.toUpperCase(), 'ROL Actualizado Correctamente');
          this.router.navigate(['administration/roles/index']);
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: ROL.')
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
    this.permissionService.resetListPermissionsSelect();
    this.status.setValue(1);
  }

  selectAll(): void {
    this.permissions.value.forEach((checked, index) => {
      if (!checked) {
        this.permissions.controls[index].setValue(true);
      }
    });
    this.permissionService.selectAllListPermissionsSelect();
  }

  deselectAll(): void {

    this.permissions.value.forEach((checked, index) => {
      if (checked) {
        this.permissions.controls[index].setValue(false);
      }
    });
    this.permissionService.resetListPermissionsSelect();
    this.permissions.markAsDirty();
  }

  addPermissions() {
    let quantityPermissions: number = this.permissionService.index - 1;
    for (var i = 0; i <= quantityPermissions; i++) {
      const formControl = new FormControl(false)
      this.permissions.push(formControl);
    }
  }

  getIdToParameterFromUrl(): void {
    this.route.paramMap.subscribe(
      params => this.idRole = parseInt(params.get('id'))
    );
  }

  ngOnDestroy() {
    if (this.initialState.type == UPDATE) this.gralService.changeDisabled(true);
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  updateSelectPermissions(permission: Permission, resource: string) {
    let arraySlug: Array<string> = permission.slug.split('.');
    let type: string = arraySlug[0];
    let method: string = arraySlug[1];

    switch (type) {
      case 'users':
      case 'roles':
      case 'companies-positions':
      case 'health-centers':
      case 'expenses':
      case 'types-expenses':
      case 'tests':
      case 'studies':
      case 'patients':
        if (method !== INDEX && !this.permissions.controls[permission.index].value) {
          let slug: string = type + '.' + INDEX;
          this.permissions.controls[permission.index].setValue(true);
          this.permissionService.objectListPermissions[resource].permissions.forEach(permission => {
            if (permission.slug === slug) {
              this.permissions.controls[permission.index].setValue(true);
            }
          })
        } else if (method === INDEX && this.permissions.controls[permission.index].value) {
          this.permissionService.objectListPermissions[resource].permissions.forEach(permission => {
            let typeSlug: string = permission.slug.split('.')[0];
            if (type === typeSlug) {
              this.permissions.controls[permission.index].setValue(false)
            }
          })
        } else if (method === INDEX && !this.permissions.controls[permission.index].value) {
          this.permissions.controls[permission.index].setValue(true)
        }
        break;
    }

    this.getSelectPermissions(resource);
  }
}
