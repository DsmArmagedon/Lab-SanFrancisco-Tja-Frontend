import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IMAGES } from 'src/app/config';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
@Component({
  selector: 'app-users-show',
  templateUrl: './users-show.component.html'
})
export class UsersShowComponent implements OnInit, OnDestroy {
  user: User;
  urlImage: string;
  loadUser: boolean;
  txtStatusSecUser: string;
  id: string;
  private onDestroy = new Subject();

  constructor(public bsModalRef: BsModalRef,
    private userService: UserService,
    private toastr: ToastrService) {
    this.urlImage = IMAGES.original;
  }

  ngOnInit() {
    this.loadUser = false;
    this.userService.editShowUsers(this.id)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadUser = true)
      )
      .subscribe(
        resp => {
          this.user = resp;
          this.urlImage = this.user.images.original;
        },
        () => {
          this.toastr.error('Consulte con el Administrador.', 'Error al mostrar el USUARIO.');
        }
      );
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
