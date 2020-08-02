import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RoleService } from '../../../../services/role/role.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Role } from 'src/app/models/role/role.model';
@Component({
  selector: 'app-roles-show',
  templateUrl: './roles-show.component.html',
  styles: []
})
export class RolesShowComponent implements OnInit, OnDestroy {
  loadRole: boolean;
  nroInitial: string;
  id: number;
  txtStatusSecRole: string;
  role: Role = new Role;

  private onDestroy = new Subject();
  constructor(public bsModalRef: BsModalRef,
    private roleService: RoleService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loadRole = false;
    this.roleService.editShowRoles(this.id)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadRole = true)
      )
      .subscribe(
        resp => this.role = resp,
        () => this.toastr.error('Consulte con el Administrador.', 'Error al mostrar el ROL.')
      );
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete()
  }
}
