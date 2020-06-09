import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../services/expense/expense.service';
import { Router } from '@angular/router';

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
  constructor(private expenseService: ExpenseService,
              private router: Router) {
    this.expenseService.disabledUpdateObservable.subscribe(
      resp => setTimeout( () => this.disabled = resp,0)
    );
    this.expenseService.selectBtnActiveObservable.subscribe(
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
