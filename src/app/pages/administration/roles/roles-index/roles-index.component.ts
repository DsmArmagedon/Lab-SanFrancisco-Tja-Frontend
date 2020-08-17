import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RolesFilterComponent } from '../roles-filter/roles-filter.component';
import { RoleService } from '../../../../services/role/role.service';
import { FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RolesShowComponent } from '../roles-show/roles-show.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from '../../../../services/common/swal.service';
import { Router } from '@angular/router';
import { INDEX } from '../../../../global-variables';
import { GeneralService } from 'src/app/services/common/general.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Meta } from 'src/app/models/custom/meta.model';
import { Role } from 'src/app/models/role/role.model';

@Component({
  selector: 'app-roles-index',
  templateUrl: './roles-index.component.html',
  styles: []
})
export class RolesIndexComponent implements OnInit, OnDestroy {
  @ViewChild(RolesFilterComponent, { static: true }) rolesFilter: RolesFilterComponent;
  isCollapsed: boolean = false;
  currentPage: number;

  meta: Meta;
  formFilter: FormGroup;
  perPage: number = 25;
  loadRoles: boolean;
  roles: Role[] = [];
  maxSize: number = 3;
  bsModalRef: BsModalRef;

  private onDestroy = new Subject();
  constructor(private roleService: RoleService,
    private modalService: BsModalService,
    private swalService: SwalService,
    private toastr: ToastrService,
    private router: Router,
    private gralService: GeneralService) {
    this.meta = new Meta();
    this.gralService.changeSelectBtn(INDEX);
  }

  ngOnInit() {
    this.formFilter = this.rolesFilter.formGroupFilter();
    this.indexRoles();
  }

  indexRoles(): void {
    this.loadRoles = false;
    this.roleService.indexRoles(this.formFilter.value, this.perPage, this.currentPage)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadRoles = true)
      )
      .subscribe(
        resp => {
          this.roles = resp.roles;
          this.meta = resp.meta;
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los ROLES.')
      );
  }

  showRoles(id: number) {
    const initialState = {
      id: id,
      txtStatusSecRole: 'Cargando Rol',
      nroInitial: 1
    }
    this.bsModalRef = this.modalService.show(RolesShowComponent, { initialState });
    this.bsModalRef.setClass('modal-lg');
  }

  destroyRoles(id: number, name: string): void {
    let title: string = 'Rol';
    Swal.fire(
      this.swalService.deleteOptions(name, title)
    ).then((result) => {
      if (result.value) {
        this.swalService.deleteLoad(title);
        this.roleService.destroyRoles(id)
          .pipe(
            takeUntil(this.onDestroy),
            finalize(() => Swal.close())
          )
          .subscribe(
            resp => {
              this.toastr.success(`${title} ${resp.name.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente.`);
              this.indexRoles();
            },
            err => {
              if (err.status === 406) {
                this.toastr.info('Prohibido eliminar el Administrador del Sistema.', 'Información');
              } else {
                this.toastr.error('Consulte con el Administrador.', `Error al eliminar: ROL`);
              }
            }
          );
      }
    })
  }

  filter(event): void {
    this.currentPage = 1;
    this.formFilter = event;
    this.indexRoles();

  }
  changePerPage(): void {
    this.currentPage = 1;
    this.indexRoles();
  }

  resetFormFilter(): void {
    this.rolesFilter.resetFormFilter();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.indexRoles();
  }

  updateRoles(id: number) {
    this.router.navigate(['administration/roles/update', id]);
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
