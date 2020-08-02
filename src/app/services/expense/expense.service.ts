import { URL_GLOBAL } from './../../config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from 'src/app/models/expense/expense.model';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Params } from '@angular/router';
import { BaseService } from '../base/base.service';
import { TypeExpense } from 'src/app/models/type-expense/type-expense.model';
import { ExpenseCollection } from 'src/app/models/expense/expense-collection.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  indexExpenses(formFilter: FormGroup, per_page: number, page: number): Observable<ExpenseCollection> {
    let url = `${URL_GLOBAL}/expenses`;
    let paramsFormFilter: any = formFilter.value;
    let dateInitialFormat: string = null;
    let dateFinalFormat: string = null;
    delete paramsFormFilter.expense_date;
    let dateInitial = formFilter.get('expense_date').value[0];
    let dateFinal = formFilter.get('expense_date').value[1];
    if (dateInitial) {
      dateInitialFormat = this.convertDateToString(dateInitial);
    }
    if (dateFinal) {
      dateFinalFormat = this.convertDateToString(dateFinal);
    }
    const params: Params = {
      per_page: per_page,
      page: page,
      type_expense: 'load',
      type_expense_select: 'name',
      expense_date_initial: dateInitialFormat,
      expense_date_final: dateFinalFormat,
      expense_order_by: 'date_expense',
      expense_order_option: 'DESC',
      ...paramsFormFilter
    }
    return this.http.get<ExpenseCollection>(url, { params }).pipe(
      map((resp: any) => {
        resp.data = resp.data.map((expense: Expense) => {
          expense.typeExpense = Object.assign(new TypeExpense, expense.typeExpense);
          return Object.assign(new Expense, expense);
        })
        return Object.assign(new ExpenseCollection, resp);
      })
    );
  }

  codeExpenses(): Observable<any> {
    let url = `${URL_GLOBAL}/expenses-code`;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  editExpenses(code: string): Observable<Expense> {
    let url = `${URL_GLOBAL}/expenses/${code}`;
    const params: Params = {
      type_expense: 'load',
      type_expense_select: 'name,status',
    }
    return this.http.get<Expense>(url, { params }).pipe(
      map((resp: any) => {
        resp.data.typeExpense = Object.assign(new TypeExpense, resp.data.typeExpense);
        return Object.assign(new Expense, resp.data);
      })
    );
  }

  storeExpenses(expense: Expense): Observable<Expense> {
    let url = `${URL_GLOBAL}/expenses`;
    return this.http.post<Expense>(url, expense).pipe(
      map((resp: any) => {
        return Object.assign(new Expense, resp.data);
      })
    );
  }

  updateExpenses(expense: Expense): Observable<Expense> {
    let url = `${URL_GLOBAL}/expenses/${expense.code}`;
    return this.http.put<Expense>(url, expense).pipe(
      map((resp: any) => {
        return Object.assign(new Expense, resp.data);
      })
    );
  }

  revokeRestoreExpenses(code: string, type: string): Observable<Expense> {
    let url = `${URL_GLOBAL}/expenses/${code}/${type}`;
    return this.http.get<Expense>(url).pipe(
      map((resp: any) => {
        return Object.assign(new Expense, resp.data);
      })
    );
  }
}
