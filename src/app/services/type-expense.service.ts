import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_GLOBAL } from '../config';
import { Params } from '@angular/router';
import { TypeExpense } from '../models/type-expense.model';
import { TypeExpenseCollection } from '../models/type-expense-collection.model';

@Injectable({
  providedIn: 'root'
})
export class TypeExpenseService {

  constructor(private http: HttpClient) { }

  indexTypeExpenses(formFilter: any, per_page: number, page: number): Observable<TypeExpenseCollection> {
    const url = `${URL_GLOBAL}/types-expenses`;

    const params: Params = {
      per_page: per_page,
      page: page,
      type_expense_order_by: 'created_at',
      type_expense_order_option: 'DESC',
      ...formFilter
    }

    return this.http.get<TypeExpenseCollection>(url, { params }).pipe(
      map((response: any) => {
        response.data = response.data.map((typeExpense: TypeExpense) => new TypeExpense(typeExpense));
        return new TypeExpenseCollection(response);
      })
    );
  }

  storeTypeExpenses(typeExpense: TypeExpense): Observable<TypeExpense> {
    const url = `${URL_GLOBAL}/types-expenses`
    return this.http.post<TypeExpense>(url, typeExpense).pipe(
      map((response: any) => {
        return new TypeExpense(response.data);
      })
    );
  }

  editShowTypeExpenses(id: number): Observable<TypeExpense> {
    const url = `${URL_GLOBAL}/types-expenses/${id}`;
    return this.http.get<TypeExpense>(url).pipe(
      map((response: any) => {
        return new TypeExpense(response.data);
      })
    );
  }

  updateTypeExpenses(typeExpense: TypeExpense): Observable<TypeExpense> {
    const url = `${URL_GLOBAL}/types-expenses/${typeExpense.id}`;
    return this.http.put<TypeExpense>(url, typeExpense).pipe(
      map((response: any) => {
        return new TypeExpense(response.data);
      })
    );
  }

  destroyTypeExpenses(id: number): Observable<TypeExpense> {
    const url = `${URL_GLOBAL}/types-expenses/${id}`;
    return this.http.delete<TypeExpense>(url).pipe(
      map((response: any) => {
        return new TypeExpense(response.data);
      })
    );
  }

  listTypeExpenses(): Observable<TypeExpense[]> {
    const url = `${URL_GLOBAL}/types-expenses`;
    const params: Params = {
      type_expense_fields: 'name',
      type_expense_status: 1,
      paginate: 'disabled',
      type_expense_order_by: 'name',
      type_expense_order_option: 'ASC'
    }
    return this.http.get<TypeExpense[]>(url, { params }).pipe(
      map((response: any) => {
        return response.data.map((typeExpense: TypeExpense) => new TypeExpense(typeExpense));
      })
    );
  }
}
