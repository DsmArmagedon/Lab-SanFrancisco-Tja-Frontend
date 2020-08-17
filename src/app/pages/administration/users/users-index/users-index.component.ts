import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/service.index';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user/user.model';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { TitleCasePipe } from '@angular/common';
import { SwalService } from 'src/app/services/common/swal.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { INDEX } from 'src/app/global-variables';
import { UsersShowComponent } from '../users-show/users-show.component';
import { GeneralService } from 'src/app/services/common/general.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { Meta } from 'src/app/models/custom/meta.model';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styles: []
})
export class UsersIndexComponent implements OnInit, OnDestroy {
  @ViewChild(UsersFilterComponent, { static: true }) usersFilter: UsersFilterComponent;

  users: User[] = [];
  maxSize: number = 3;
  meta: Meta;
  loadUsers: boolean = false;
  totalItems: number;
  formFilter: FormGroup;
  perPage: number = 25;
  currentPage: number;
  isCollapsed = false;
  page: number;
  bsModalRef: BsModalRef;
  private onDestroy = new Subject();
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
      txtStatusSecUser: 'Cargando Usuario'
    }
    this.bsModalRef = this.modalService.show(UsersShowComponent, { initialState });
    this.bsModalRef.setClass('modal-lg');
  }

  indexUsers(): void {
    this.loadUsers = false;
    this.userService.indexUsers(this.formFilter.value, this.perPage, this.currentPage)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadUsers = true)
      )
      .subscribe(
        resp => {
          this.users = resp.users;
          this.meta = resp.meta;
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los USUARIOS.')
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
        this.userService.destroyUsers(ci)
          .pipe(
            takeUntil(this.onDestroy),
            finalize(() => Swal.close())
          ).subscribe(
            resp => {
              this.toastr.success(`${title} ${resp.fullName.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente.`);
              this.indexUsers();
            },
            err => {
              if (err.status === 406) {
                this.toastr.error(`Prohibido eliminar el recurso, debido a que realizo TRANSACCIONES en otros recursos.`, `Error al eliminar: USUARIO`);
              } else {
                this.toastr.error('Consulte con el Administrador.', `Error al eliminar: USUARIO.`);
              }
            }
          );
      }
    })
  }

  updateUsers(id: number) {
    this.router.navigate(['administration/users/update', id]);
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}