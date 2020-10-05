import { URL_GLOBAL } from '../config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from 'src/app/models/expense.model';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Params } from '@angular/router';
import { BaseService } from './base.service';
import { TypeExpense } from '../models/type-expense.model';
import { ExpenseCollection } from '../models/expense-collection.model';
import * as moment from 'moment';
import { DATE_FORMAT } from '../global-variables';
@Injectable({
  providedIn: 'root'
})
export class ExpenseService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Lista los Gastos (Expense) de forma paginada.
   *
   * @param formFilter FormGroup
   * @param per_page number
   * @param page number
   */
  indexExpenses(formFilter: FormGroup, per_page: number, page: number): Observable<ExpenseCollection> {
    const url = `${URL_GLOBAL}/expenses`;
    let paramsFormFilter: any = formFilter.value;
    let dateInitialFormat: string = null;
    let dateFinalFormat: string = null;
    delete paramsFormFilter.expense_date;
    const dateInitial = formFilter.get('expense_date').value[0];
    const dateFinal = formFilter.get('expense_date').value[1];
    if (dateInitial && dateFinal) {
      dateInitialFormat = moment(dateInitial).format(DATE_FORMAT);
      dateFinalFormat = moment(dateFinal).format(DATE_FORMAT);
    }
    const params: Params = {
      per_page: per_page,
      page: page,
      type_expense: 'load',
      type_expense_fields: 'name',
      expense_date_initial: dateInitialFormat,
      expense_date_final: dateFinalFormat,
      expense_order_by: 'date_expense',
      expense_order_option: 'DESC',
      ...paramsFormFilter
    }
    return this.http.get<ExpenseCollection>(url, { params }).pipe(
      map((response: any) => {
        response.data = response.data.map((expense: Expense) => {
          expense.typeExpense = new TypeExpense(expense.typeExpense);
          return new Expense(expense);
        })
        return new ExpenseCollection(response);
      })
    );
  }

  codeExpenses(): Observable<string> {
    const url = `${URL_GLOBAL}/expenses-code`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }

  editExpenses(code: string): Observable<Expense> {
    const url = `${URL_GLOBAL}/expenses/${code}`;
    const params: Params = {
      type_expense: 'load',
      type_expense_fields: 'name,status',
    }
    return this.http.get<Expense>(url, { params }).pipe(
      map((response: any) => {
        response.data.typeExpense = new TypeExpense(response.data.typeExpense);
        return new Expense(response.data);
      })
    );
  }

  storeExpenses(expense: Expense): Observable<Expense> {
    const url = `${URL_GLOBAL}/expenses`;
    return this.http.post<Expense>(url, expense).pipe(
      map((response: any) => {
        return new Expense(response.data);
      })
    );
  }

  updateExpenses(expense: Expense): Observable<Expense> {
    const url = `${URL_GLOBAL}/expenses/${expense.code}`;
    return this.http.put<Expense>(url, expense).pipe(
      map((response: any) => {
        return new Expense(response.data);
      })
    );
  }

  revokeRestoreExpenses(code: string, type: string): Observable<Expense> {
    const url = `${URL_GLOBAL}/expenses/${code}/${type}`;
    return this.http.get<Expense>(url).pipe(
      map((response: any) => {
        return new Expense(response.data);
      })
    );
  }
}
