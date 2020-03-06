import { TypesExpensesIndexComponent } from './types-expenses-index/types-expenses-index.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-types-expenses',
  templateUrl: './types-expenses.component.html'
})
export class TypesExpensesComponent implements OnInit {

  @ViewChild(TypesExpensesIndexComponent, { static: true }) typeExpenseIndex: TypesExpensesIndexComponent;
  constructor() { }

  ngOnInit() {
  }

  executeIndex(): void {
    this.typeExpenseIndex.indexTypeExpenses();
  }

  selectRowIndexNull(): void {
    this.typeExpenseIndex.selectedRowIndex = null;
  }
}
