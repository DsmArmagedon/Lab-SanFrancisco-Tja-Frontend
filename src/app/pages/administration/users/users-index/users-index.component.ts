import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Meta } from 'src/app/models/meta.model';
import { UserService } from 'src/app/services/service.index';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { TitleCasePipe } from '@angular/common';
import { SwalService } from 'src/app/services/common/swal.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { INDEX } from 'src/app/global-variables';
import { UsersShowComponent } from '../users-show/users-show.component';
import { GeneralService } from 'src/app/services/common/general.service';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styles: []
})
export class UsersIndexComponent implements OnInit {
  @ViewChild(UsersFilterComponent, { static: true }) usersFilter: UsersFilterComponent;

  users: User[] = [];
  maxSize: number = 3;
  meta: Meta;
  loadPage: boolean = false;
  totalItems: number;
  formFilter: FormGroup;
  perPage: number = 25;
  public currentPage: number;
  public isCollapsed = false;
  page: number;
  bsModalRef: BsModalRef;
  subscription: Subscription;
  constructor(private userService: UserService,
    private titleCase: TitleCasePipe,
    private swalService: SwalService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private router: Router,
    private gralService: GeneralService) {
    this.meta = new Meta;
    this.gralService.changeSelectBtn(INDEX);
  }
  ngOnInit() {
    this.formFilter = this.usersFilter.formGroupFilter();
    this.indexUsers();
  }

  showUsers(ci: string) {
    const initialState = {
      id: ci,
      txtLoad: 'Cargando Usuario'
    }
    this.bsModalRef = this.modalService.show(UsersShowComponent, { initialState });
    this.bsModalRef.setClass('modal-lg');
  }

  indexUsers(): void {
    this.loadPage = false;
    this.userService.indexUsers(this.formFilter.value, this.perPage, this.currentPage).subscribe(
      resp => {
        this.users = resp.users;
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

  destroyUsers(ci: string, fullName: string): void {
    let title: string = 'Usuario';
    Swal.fire(
      this.swalService.deleteOptions(this.titleCase.transform(fullName), title)
    ).then((result) => {
      if (result.value) {
        this.swalService.deleteLoad(title);
        this.userService.destroyUsers(ci).subscribe(
          resp => {
            Swal.close();
            this.toastr.success(`${title} ${resp.fullName.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente.`);
            this.indexUsers();
          },
          err => {
            this.swalService.deleteError(err.status, title);
          }
        );
      }
    })
  }

  updateUsers(id: number) {
    this.router.navigate(['administration/users/update', id]);
  }
}