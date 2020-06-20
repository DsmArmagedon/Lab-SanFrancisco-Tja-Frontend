import { URL_GLOBAL } from './../../config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Parameter } from 'src/app/models/parameter.model';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  constructor(private http: HttpClient) { }

  indexParameters(id: number): Observable<Parameter[]> {
    let url = `${URL_GLOBAL}/tests-composeds-titles/${id}/parameters`;
    const params: Params = {
      unit: 'load',
      unit_select: 'name,display'
    }
    return this.http.get<Parameter[]>(url, { params }).pipe(
      map((resp: any) => {
        return Object.assign(new Parameter, resp.data);
      })
    );
  }
}
