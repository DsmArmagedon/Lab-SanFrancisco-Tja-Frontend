import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { RolesFilterComponent } from '../roles-filter/roles-filter.component';
import { Role } from 'src/app/models/role.model';
import { RoleService } from '../../../../services/role/role.service';
import { FormGroup } from '@angular/forms';
import { Meta } from 'src/app/models/meta.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RolesShowComponent } from '../roles-show/roles-show.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from '../../../../services/common/swal.service';
import { Router } from '@angular/router';
import { INDEX } from '../../../../global-variables';

@Component({
  selector: 'app-roles-index',
  templateUrl: './roles-index.component.html',
  styles: []
})
export class RolesIndexComponent implements OnInit{
  public isCollapsed: boolean = true;
  public currentPage: number;

  meta: Meta;
  formFilter: FormGroup;
  perPage: number = 25;
  loadPage: boolean;
  roles: Role[] = [];
  maxSize: number = 3;
  bsModalRef: BsModalRef;
  @ViewChild(RolesFilterComponent,{ static: true }) rolesFilter: RolesFilterComponent;
  constructor(private roleService: RoleService,
              private modalService: BsModalService,
              private swalService: SwalService,
              private toastr: ToastrService,
              private router: Router) {
    this.meta = new Meta();
    this.roleService.changeSelectBtn(INDEX);
   }
  
  ngOnInit() {
    this.formFilter = this.rolesFilter.formGroupFilter();
    this.indexRoles();
  }

  indexRoles(): void {
    this.loadPage = false;
    this.roleService.indexRoles(this.formFilter.value, this.perPage, this.currentPage).subscribe(
      resp => {
        this.roles = resp.data;
        this.meta = resp.meta;
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los ROLES.')
    ).add(
      () => this.loadPage = true
    );
  }

  showRoles(id: number) {
    const initialState = {
      id:id,
      txtLoad: 'Cargando Rol',
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
        this.roleService.destroyRoles(id).subscribe(
          resp => {
            Swal.close();
            this.toastr.success(`${title} ${resp.name.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente.`);
            this.indexRoles();
          },
          err => {
            this.swalService.deleteError(err.status,title);
          }
        );
      }
    })
  }

  filter(event):void {
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
    this.router.navigate(['administration/roles/update',id]);
  }
}
