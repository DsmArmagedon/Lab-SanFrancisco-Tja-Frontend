import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit {
  radioModel: string;
  routeIndex = 'administration/roles/index';
  routeStore = 'administration/roles/store';
  routeUpdate = 'administration/roles/update';
  disabled: boolean = true;

  constructor(private roleService: RoleService,
              private router: Router) {
    this.roleService.disabledEditObservable.subscribe(
      // setTimeOut => Error: ExpressionChangedAfterItHasBeenCheckedError
      resp => setTimeout( () => this.disabled = resp, 0 )
    );
    this.roleService.selectBtnActiveObservable.subscribe(
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
