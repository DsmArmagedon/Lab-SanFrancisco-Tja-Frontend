import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_GLOBAL } from '../config';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';
import { HealthCenter } from '../models/health-center.model';
import { HealthCenterCollection } from '../models/health-center-collection.model';


@Injectable({
  providedIn: 'root'
})
export class HealthCenterService {

  constructor(private http: HttpClient) { }

  indexHealthCenters(formFilter: any, per_page: number, page: number): Observable<HealthCenterCollection> {
    let url = `${URL_GLOBAL}/health-centers`;

    const params: Params = {
      per_page: per_page,
      page: page,
      health_center_order_by: 'updated_at',
      health_center_order_option: 'DESC',
      ...formFilter
    }
    return this.http.get<HealthCenterCollection>(url, { params }).pipe(
      map((resp: any) => {
        resp.data = resp.data.map((healthCenter: HealthCenter) => Object.assign(new HealthCenter, healthCenter));
        return Object.assign(new HealthCenterCollection, resp);
      })
    );
  }

  storeHealthCenters(healthCenter: HealthCenter): Observable<HealthCenter> {
    let url = `${URL_GLOBAL}/health-centers`;
    return this.http.post<HealthCenter>(url, healthCenter).pipe(
      map((resp: any) => {
        return Object.assign(new HealthCenter, resp.data);
      })
    );
  }

  editShowHealthCenters(id: number): Observable<HealthCenter> {
    let url = `${URL_GLOBAL}/health-centers/${id}`;
    return this.http.get<HealthCenter>(url).pipe(
      map((resp: any) => {
        return Object.assign(new HealthCenter, resp.data);
      })
    );
  }

  updateHealthCenters(healthCenter: HealthCenter): Observable<HealthCenter> {
    let url = `${URL_GLOBAL}/health-centers/${healthCenter.id}`;
    return this.http.put<HealthCenter>(url, healthCenter).pipe(
      map((resp: any) => {
        return Object.assign(new HealthCenter, resp.data);
      })
    );
  }

  destroyHealthCenters(id: number): Observable<HealthCenter> {
    let url = `${URL_GLOBAL}/health-centers/${id}`;

    return this.http.delete<HealthCenter>(url).pipe(
      map((resp: any) => {
        return Object.assign(new HealthCenter, resp.data);
      })
    );
  }
}
