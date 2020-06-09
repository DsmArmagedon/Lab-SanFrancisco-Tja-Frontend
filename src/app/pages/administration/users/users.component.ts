import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  radioModel: string;
  disabled: boolean = true;
  routeIndex = 'administration/users/index';
  routeStore = 'administration/users/store';
  routeUpdate = 'administration/users/update';

  constructor(private userService: UserService,
              private router: Router) {
    this.userService.disabledUpdateObservable.subscribe(
      // setTimeOut => Error: ExpressionChangedAfterItHasBeenCheckedError
      resp => setTimeout( () => this.disabled = resp, 0 )
    );
    this.userService.selectBtnActiveObservable.subscribe(
      resp => setTimeout( () => this.radioModel = resp, 0 )
    );
  }
  ngOnInit() {
  }

  routerIndex(): void {
    this.router.navigate([this.routeIndex]);
  }

  routerStore(): void {
    this.router.navigate([this.routeStore]);
  }
}
