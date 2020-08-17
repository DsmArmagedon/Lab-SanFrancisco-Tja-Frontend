import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { delay } from 'rxjs/operators';

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
    this.gralService.disabledUpdateObservable.pipe(delay(0)).subscribe(resp => this.disabled = resp);
    this.gralService.selectBtnActiveObservable.pipe(delay(0)).subscribe(resp => this.radioModel = resp);
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
