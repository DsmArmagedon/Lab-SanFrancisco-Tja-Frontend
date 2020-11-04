import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { URL_GLOBAL } from '../config';
import { Parameter } from '../models/parameter.model';
import { Category } from '../models/category.model';
import { Unit } from '../models/unit.model';
import { KindHttp } from '../global-variables'
interface IParameterKindHttp {
  parameter: Parameter,
  kind: KindHttp
}
@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  private updatedIndexToParameterFromModalSubject = new Subject<IParameterKindHttp>();
  public updatedIndexToParameterFromModalObservable = this.updatedIndexToParameterFromModalSubject.asObservable();

  addParameterToIndexFromModal(parameter: Parameter, kind: KindHttp) {
    this.updatedIndexToParameterFromModalSubject.next({
      parameter,
      kind
    });
  }

  constructor(private http: HttpClient) { }

  indexParameters(categoryTestId: number): Observable<Parameter[]> {
    const url = `${URL_GLOBAL}/categories/${categoryTestId}/parameters`;
    const params: Params = {
      unit: 'load',
      unit_fields: 'name,display',
      category: 'load',
      category_fields: 'name'
    }
    return this.http.get<Parameter[]>(url, { params }).pipe(
      map((response: any) => {
        return response.data.map(parameter => {
          parameter.category = new Category(parameter.category);
          parameter.category_id = parameter.category.id;
          parameter.unit = new Unit(parameter.unit);
          return new Parameter(parameter)
        });
      })
    );
  }

  storeParameters(parameter: Parameter): Observable<Parameter> {
    const url = `${URL_GLOBAL}/categories/${parameter.category_id}/parameters`;
    return this.http.post<Parameter>(url, parameter).pipe(
      map((response: any) => response.data),
      switchMap((parameter: Parameter) => this.showParameters(parameter.category_id, parameter.id))
    );
  }

  updateParameters(parameter: Parameter): Observable<Parameter> {
    const url = `${URL_GLOBAL}/categories/${parameter.category_id}/parameters/${parameter.id}`;
    return this.http.put<Parameter>(url, parameter).pipe(
      map((response: any) => response.data),
      switchMap((parameter: Parameter) => this.showParameters(parameter.category_id, parameter.id))
    )
  }

  showParameters(categoryTestId: number, id: number) {
    const url = `${URL_GLOBAL}/categories/${categoryTestId}/parameters/${id}`;
    const params: Params = {
      unit: 'load',
      unit_fields: 'display',
    }
    return this.http.get<Parameter>(url, { params }).pipe(
      map((response: any) => {
        console.log(response);
        response.data.unit = new Unit(response.data.unit);
        return new Parameter(response.data);
      })
    );
  }

  destroyParameters(categoryId: number, id: number): Observable<Parameter> {
    const url = `${URL_GLOBAL}/categories/${categoryId}/parameters/${id}`;
    return this.http.delete<Parameter>(url).pipe(
      map((response: any) => {
        return new Parameter(response.data);
      })
    );
  }

}
