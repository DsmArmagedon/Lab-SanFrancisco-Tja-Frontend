import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { URL_GLOBAL } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http: HttpClient) { }

  indexPatients(value: string): Observable<any> {
    let url = `${URL_GLOBAL}/patients`;
    const params: Params = {
      patient_first_name: value
    }
    if (!value) {
      return of([]);
    }
    return this.http.get(url, { params }).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }
}
