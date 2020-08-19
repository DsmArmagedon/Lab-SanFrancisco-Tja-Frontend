import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { URL_GLOBAL } from '../config';
import { Parameter } from '../models/parameter.model';
import { Title } from '../models/title.model';
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
      parameter: parameter,
      kind: kind
    });
  }

  constructor(private http: HttpClient) { }

  indexParameters(titleTestId: number): Observable<Parameter[]> {
    const url = `${URL_GLOBAL}/tests-composeds-titles/${titleTestId}/parameters`;
    const params: Params = {
      unit: 'load',
      unit_select: 'name,display',
      title: 'load',
      title_select: 'name'
    }
    return this.http.get<Parameter[]>(url, { params }).pipe(
      map((response: any) => {
        return response.data.map(parameter => {
          parameter.title = new Title(parameter.title);
          parameter.unit = new Unit(parameter.unit);
          return new Parameter(parameter)
        });
      })
    );
  }

  storeParameters(parameter: Parameter): Observable<Parameter> {
    const url = `${URL_GLOBAL}/tests-composeds-titles/${parameter.title_id}/parameters`;
    return this.http.post<Parameter>(url, parameter).pipe(
      map((response: any) => response.data),
      switchMap((parameter: Parameter) => this.showParameters(parameter.title_id, parameter.id))
    );
  }

  updateParameters(parameter: Parameter): Observable<Parameter> {
    const url = `${URL_GLOBAL}/tests-composeds-titles/${parameter.title_id}/parameters/${parameter.id}`;
    return this.http.put<Parameter>(url, parameter).pipe(
      map((response: any) => response.data),
      switchMap((parameter: Parameter) => this.showParameters(parameter.title_id, parameter.id))
    )
  }

  showParameters(titleTestId: number, id: number) {
    const url = `${URL_GLOBAL}/tests-composeds-titles/${titleTestId}/parameters/${id}`;
    const params: Params = {
      unit: 'load',
      unit_select: 'display',
    }
    return this.http.get<Parameter>(url, { params }).pipe(
      map((response: any) => {
        response.data.unit = new Unit(response.data.unit);
        return new Parameter(response.data);
      })
    );
  }

  destroyParameters(titleId: number, id: number): Observable<Parameter> {
    const url = `${URL_GLOBAL}/tests-composeds-titles/${titleId}/parameters/${id}`;
    return this.http.delete<Parameter>(url).pipe(
      map((response: any) => {
        return new Parameter(response.data);
      })
    );
  }

}
