import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { TypeExpense } from 'src/app/models/type-expense.model';
import { map } from 'rxjs/operators';
import { Meta } from 'src/app/models/meta.model';
import { URL_GLOBAL } from './../../config';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TypeExpenseService {
  private updateTypeExpenseSubject = new Subject<TypeExpense>();
  public updateTypeExpenseObservable = this.updateTypeExpenseSubject.asObservable();

  typeExpenseEdit: TypeExpense = new TypeExpense;

  constructor(private http: HttpClient) { }

  updateTypeExpenseObs(typeExpense: TypeExpense): void {
    this.typeExpenseEdit = typeExpense;
    this.updateTypeExpenseSubject.next(this.typeExpenseEdit);
  }

  indexTypeExpenses(formFilter: any, per_page: number, page: number): Observable<TypeExpense[]> {
    let url = `${URL_GLOBAL}/types-expenses`;

    const params: Params = {
      per_page: per_page,
      page: page,
      type_expense_order_by: 'created_at',
      type_expense_order_option: 'DESC',
      ...formFilter
    }

    return this.http.get<TypeExpense[]>(url, { params }).pipe(
      map((resp: any) => {
        resp.data = resp.data.map((e) => {
          return Object.assign(new TypeExpense, e);
        })
        resp.meta = Object.assign(new Meta, resp.meta);
        return resp;
      })
    );
  }

  storeTypeExpenses(typeExpense: TypeExpense): Observable<TypeExpense> {
    let url = `${URL_GLOBAL}/types-expenses`
    return this.http.post<TypeExpense>(url, typeExpense).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  updateTypeExpenses(typeExpense: TypeExpense): Observable<TypeExpense> {
    let url = `${URL_GLOBAL}/types-expenses/${typeExpense.id}`;
    return this.http.put<TypeExpense>(url, typeExpense).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  destroyTypeExpenses(id: number): Observable<TypeExpense> {
    let url = `${URL_GLOBAL}/types-expenses/${id}`;
    return this.http.delete<TypeExpense>(url).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  listTypeExpenses(): Observable<TypeExpense[]> {
    let url = `${URL_GLOBAL}/types-expenses`;
    const params: Params = {
      type_expense_select: 'name',
      type_expense_status: 1,
      paginate: 'disabled',
      type_expense_order_by: 'name',
      type_expense_order_option: 'ASC'
    }
    return this.http.get<TypeExpense[]>(url, { params }).pipe(
      map((resp: any) => {
        let data = resp.data.map((e) => {
          return Object.assign(new TypeExpense, e);
        })
        return data;
      })
    );
  }
}
