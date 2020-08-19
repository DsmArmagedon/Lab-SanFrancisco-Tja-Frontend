import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_GLOBAL } from '../config';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';
import { HealthCenter } from '../models/health-center.model';
import { HealthCenterCollection } from '../models/health-center-collection.model';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class HealthCenterService {

  constructor(private http: HttpClient) { }

  indexHealthCenters(formFilter: FormGroup, per_page: number, page: number): Observable<HealthCenterCollection> {
    const url = `${URL_GLOBAL}/health-centers`;

    const params: Params = {
      per_page: per_page,
      page: page,
      health_center_order_by: 'updated_at',
      health_center_order_option: 'DESC',
      ...formFilter
    }
    return this.http.get<HealthCenterCollection>(url, { params }).pipe(
      map((response: any) => {
        response.data = response.data.map((healthCenter: HealthCenter) => new HealthCenter(healthCenter));
        return new HealthCenterCollection(response);
      })
    );
  }

  storeHealthCenters(healthCenter: HealthCenter): Observable<HealthCenter> {
    const url = `${URL_GLOBAL}/health-centers`;
    return this.http.post<HealthCenter>(url, healthCenter).pipe(
      map((response: any) => {
        return new HealthCenter(response.data);
      })
    );
  }

  editShowHealthCenters(id: number): Observable<HealthCenter> {
    const url = `${URL_GLOBAL}/health-centers/${id}`;
    return this.http.get<HealthCenter>(url).pipe(
      map((response: any) => {
        return new HealthCenter(response.data);
      })
    );
  }

  updateHealthCenters(healthCenter: HealthCenter): Observable<HealthCenter> {
    const url = `${URL_GLOBAL}/health-centers/${healthCenter.id}`;
    return this.http.put<HealthCenter>(url, healthCenter).pipe(
      map((response: any) => {
        return new HealthCenter(response.data);
      })
    );
  }

  destroyHealthCenters(id: number): Observable<HealthCenter> {
    const url = `${URL_GLOBAL}/health-centers/${id}`;

    return this.http.delete<HealthCenter>(url).pipe(
      map((response: any) => {
        return new HealthCenter(response.data);
      })
    );
  }
}
