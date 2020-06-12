import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/common/general.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html'
})
export class ExpensesComponent implements OnInit {
  radioModel: string;
  disabled: boolean = true;
  routeIndex = 'transaction/expenses/index';
  routeStore = 'transaction/expenses/store';
  routeUpdate = 'transaction/expenses/update';
  constructor(private gralService: GeneralService,
              private router: Router) {
    this.gralService.disabledUpdateObservable.subscribe(
      resp => setTimeout( () => this.disabled = resp,0)
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
