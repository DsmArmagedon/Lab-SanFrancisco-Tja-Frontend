import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeExpense, TypeExpenseCollection } from 'src/app/models/type-expense.model';
import { map } from 'rxjs/operators';
import { URL_GLOBAL } from './../../config';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TypeExpenseService {

  constructor(private http: HttpClient) { }

  indexTypeExpenses(formFilter: any, per_page: number, page: number): Observable<TypeExpenseCollection> {
    let url = `${URL_GLOBAL}/types-expenses`;

    const params: Params = {
      per_page: per_page,
      page: page,
      type_expense_order_by: 'created_at',
      type_expense_order_option: 'DESC',
      ...formFilter
    }

    return this.http.get<TypeExpenseCollection>(url, { params }).pipe(
      map((resp: any) => {
        return Object.assign(new TypeExpenseCollection, resp);
      })
    );
  }

  storeTypeExpenses(typeExpense: TypeExpense): Observable<TypeExpense> {
    let url = `${URL_GLOBAL}/types-expenses`
    return this.http.post<TypeExpense>(url, typeExpense).pipe(
      map((resp: any) => {
        return Object.assign(new TypeExpense, resp.data);
      })
    );
  }

  editShowTypeExpenses(id: number): Observable<TypeExpense> {
    let url = `${URL_GLOBAL}/types-expenses/${id}`;
    return this.http.get<TypeExpense>(url).pipe(
      map((resp: any) => {
        return Object.assign(new TypeExpense, resp.data);
      })
    );
  }

  updateTypeExpenses(typeExpense: TypeExpense): Observable<TypeExpense> {
    let url = `${URL_GLOBAL}/types-expenses/${typeExpense.id}`;
    return this.http.put<TypeExpense>(url, typeExpense).pipe(
      map((resp: any) => {
        return Object.assign(new TypeExpense, resp.data);
      })
    );
  }

  destroyTypeExpenses(id: number): Observable<TypeExpense> {
    let url = `${URL_GLOBAL}/types-expenses/${id}`;
    return this.http.delete<TypeExpense>(url).pipe(
      map((resp: any) => {
        return Object.assign(new TypeExpense, resp.data);
      })
    );
  }

  listTypeExpenses(): Observable<TypeExpenseCollection> {
    let url = `${URL_GLOBAL}/types-expenses`;
    const params: Params = {
      type_expense_select: 'name',
      type_expense_status: 1,
      paginate: 'disabled',
      type_expense_order_by: 'name',
      type_expense_order_option: 'ASC'
    }
    return this.http.get<TypeExpenseCollection>(url, { params }).pipe(
      map((resp: any) => {
        return Object.assign(new TypeExpenseCollection, resp);
      })
    );
  }
}
