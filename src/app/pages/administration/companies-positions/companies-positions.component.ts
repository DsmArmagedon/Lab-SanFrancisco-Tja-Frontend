import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/common/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companies-positions',
  templateUrl: './companies-positions.component.html'
})
export class CompaniesPositionsComponent implements OnInit {

  radioModel: string;
  disabled: boolean = true;
  routeIndex = 'administration/companies-positions/index';
  routeStore = 'administration/companies-positions/store';
  routeUpdate = 'administration/companies-positions/update';

  constructor(private gralService: GeneralService,
    private router: Router) {
    this.gralService.disabledUpdateObservable.subscribe(
      // setTimeOut => Error: ExpressionChangedAfterItHasBeenCheckedError
      resp => setTimeout(() => this.disabled = resp, 0)
    );
    this.gralService.selectBtnActiveObservable.subscribe(
      resp => setTimeout(() => this.radioModel = resp, 0)
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
