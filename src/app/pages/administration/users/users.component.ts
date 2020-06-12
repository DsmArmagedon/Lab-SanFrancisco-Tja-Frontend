import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/common/general.service';

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

  constructor(private gralService: GeneralService,
              private router: Router) {
    this.gralService.disabledUpdateObservable.subscribe(
      // setTimeOut => Error: ExpressionChangedAfterItHasBeenCheckedError
      resp => setTimeout( () => this.disabled = resp, 0 )
    );
    this.gralService.selectBtnActiveObservable.subscribe(
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
