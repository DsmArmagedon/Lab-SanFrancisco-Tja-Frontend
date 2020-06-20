import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/common/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html'
})
export class UnitsComponent implements OnInit {

  radioModel: string;
  disabled: boolean = true;
  routeIndex = 'test/units/index';
  routeStore = 'test/units/store';
  routeUpdate = 'test/units/update';

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
