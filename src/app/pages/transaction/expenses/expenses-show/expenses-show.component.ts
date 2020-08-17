import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense.model';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-expenses-show',
  templateUrl: './expenses-show.component.html',
  styles: []
})
export class ExpensesShowComponent implements OnInit {

  expense: Expense;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
