import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user.model';
import { Meta } from '../../../models/meta.model';
import { FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UsersStoreUpdateComponent } from './users-store-update/users-store-update.component';
import { UsersFilterComponent } from './users-filter/users-filter.component';
import { Subscription } from 'rxjs';
import { UsersShowComponent } from './users-show/users-show.component';
import Swal from 'sweetalert2';
import { TitleCasePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from '../../../services/swal/swal.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  maxSize: number = 3;
  meta: Meta;
  loadPage: boolean = false;
  totalItems: number;
  formFilter: FormGroup;
  perPage: number = 25;
  public currentPage: number;
  public isCollapsed = true;
  page: number;
  bsModalRef: BsModalRef;
  subscription: Subscription;
  @ViewChild(UsersFilterComponent,{ static: true }) usersFilter: UsersFilterComponent;
  constructor( private userService: UserService, 
               private modalService: BsModalService,
               private titleCase:TitleCasePipe,
               private swalService: SwalService,
               private toastr: ToastrService) { 
    this.meta = new Meta();
  }
  ngOnInit() {
    this.formFilter = this.usersFilter.formGroupFilter();
    this.indexUsers();
  }

  storeUsers():void {
    const initialState = {
      titleModal: 'Crear Usuario',
      txtLoad: 'Cargando Usuario',
      ciId: null,
      btnStoreUpdate: 'Guardar'
    }
    this.showModal(initialState);
  }
  
  updateUsers(ci: string): void {
    const initialState = {
      titleModal: 'Editar Usuario',
      txtLoad: 'Cargando Usuario',
      ciId: ci,
      btnStoreUpdate: 'Actualizar'
    }
    this.showModal(initialState);
  }

  showModal(initialState: any): void {
    this.bsModalRef = this.modalService.show(UsersStoreUpdateComponent,{initialState: initialState, ignoreBackdropClick: true});
    this.bsModalRef.setClass('modal-lg');
    this.subscription = this.modalService.onHide.subscribe(()=> {
      if(this.bsModalRef.content.optionModal) {
        this.indexUsers();
      }
      this.subscription.unsubscribe();
    })
  }

  showUsers(ci: string) {
    const initialState = {
      ciId: ci
    }
    this.bsModalRef = this.modalService.show(UsersShowComponent, { initialState });
    this.bsModalRef.setClass('modal-lg');
  }

  indexUsers():void {
    this.loadPage = false;
    this.userService.indexUsers(this.formFilter.value,this.perPage, this.currentPage).subscribe(
      resp => {
        this.users = resp.data;
        this.meta = resp.meta;
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los USUARIOS.')
    ).add(
      () => this.loadPage = true
    );
  }
  
  filter($event) {
    this.currentPage = 1;
    this.formFilter = $event;
    this.indexUsers();
  }

  resetFormFilter(): void {
    this.usersFilter.resetFormFilter();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.indexUsers();
  }

  changePerPage() {
    this.currentPage = 1;
    this.indexUsers();
  }

  destroyUsers(ci: string, fullName: string):void {
    let title: string = 'Usuario';
    Swal.fire(
      this.swalService.deleteOptions(this.titleCase.transform(fullName), title)
    ).then((result) => {
      if (result.value) {
        this.swalService.deleteLoad(title);
        this.userService.destroyUsers(ci).subscribe(
          resp => {
            Swal.close();
            this.toastr.success(`${title} ${resp.name.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente.`);
            this.indexUsers();
          },
          err => {
            this.swalService.deleteError(err.status,title);
          }
        );
      }
    })
  }
}
