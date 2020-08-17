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
    let url = `${URL_GLOBAL}/tests-composeds-titles/${titleTestId}/parameters`;
    const params: Params = {
      unit: 'load',
      unit_select: 'name,display',
      title: 'load',
      title_select: 'name'
    }
    return this.http.get<Parameter[]>(url, { params }).pipe(
      map((resp: any) => {
        return resp.data.map(parameter => {
          parameter.title = Object.assign(new Title, parameter.title);
          parameter.unit = Object.assign(new Unit, parameter.unit);
          return Object.assign(new Parameter, parameter)
        });
      })
    );
  }

  storeParameters(parameter: Parameter): Observable<Parameter> {
    let url = `${URL_GLOBAL}/tests-composeds-titles/${parameter.title_id}/parameters`;
    return this.http.post<Parameter>(url, parameter).pipe(
      map((resp: any) => resp.data),
      switchMap((parameter: Parameter) => this.showParameters(parameter.title_id, parameter.id))
    );
  }

  updateParameters(parameter: Parameter): Observable<Parameter> {
    let url = `${URL_GLOBAL}/tests-composeds-titles/${parameter.title_id}/parameters/${parameter.id}`;
    return this.http.put<Parameter>(url, parameter).pipe(
      map((resp: any) => resp.data),
      switchMap((parameter: Parameter) => this.showParameters(parameter.title_id, parameter.id))
    )
  }

  showParameters(titleTestId: number, id: number) {
    let url = `${URL_GLOBAL}/tests-composeds-titles/${titleTestId}/parameters/${id}`;
    const params: Params = {
      unit: 'load',
      unit_select: 'display',
    }
    return this.http.get<Parameter>(url, { params }).pipe(
      map((resp: any) => {
        resp.data.unit = Object.assign(new Unit, resp.data.unit);
        return Object.assign(new Parameter, resp.data);
      })
    );
  }

  destroyParameters(titleId: number, id: number): Observable<Parameter> {
    let url = `${URL_GLOBAL}/tests-composeds-titles/${titleId}/parameters/${id}`;
    return this.http.delete<Parameter>(url).pipe(
      map((resp: any) => {
        return Object.assign(new Parameter, resp.data);
      })
    );
  }

}
