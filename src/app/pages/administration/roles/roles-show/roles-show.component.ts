import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Role } from 'src/app/models/role.model';
import { RoleService } from '../../../../services/role/role.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-roles-show',
  templateUrl: './roles-show.component.html',
  styles: []
})
export class RolesShowComponent implements OnInit {
  loadPage: boolean;
  nroInitial: string;
  id: number;
  txtLoad: string;
  role: Role;
  constructor(public bsModalRef: BsModalRef,
              private roleService: RoleService, 
              private toastr: ToastrService) {
               }

  ngOnInit() {
    this.loadPage = false;
    this.roleService.editShowRoles(this.id).subscribe(
      resp => {
        this.role = resp;
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al mostrar el ROL.')
    ).add(
      () => this.loadPage = true
    );
  }
}
