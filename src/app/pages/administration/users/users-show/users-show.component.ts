import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IMAGES } from 'src/app/config';
import { UserService } from '../../../../services/user/user.service';
import { User } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-users-show',
  templateUrl: './users-show.component.html'
})
export class UsersShowComponent implements OnInit {
  user: User;
  urlImage: string;
  loadPage: boolean;
  txtLoad: string;
  ciId: string;
  constructor(public bsModalRef: BsModalRef, 
              private userService: UserService,
              private toastr: ToastrService) {
    this.urlImage = IMAGES.original;
    this.txtLoad = 'Cargando Usuario';
   }

  ngOnInit() {
    this.loadPage = false;
    this.userService.editShowUsers(this.ciId).subscribe(
      resp => {
        this.user = resp;
        this.urlImage = this.user.images.original;
      },
      () => {
        this.toastr.error('Consulte con el Administrador.', 'Error al mostrar el USUARIO.');
      }
    ).add(
      () => this.loadPage = true
    );
  }
   
}
