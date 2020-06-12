import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { HealthCenter } from 'src/app/models/health-center.model';
import { Meta } from 'src/app/models/meta.model';
import { URL_GLOBAL } from 'src/app/config';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HealthCenterService {

  constructor(private http: HttpClient) { }

  private updateHealthCenterSubject = new Subject<HealthCenter>();
  public updateHealthCenterObservable = this.updateHealthCenterSubject.asObservable();

  healthCenterEdit: HealthCenter = new HealthCenter;

  updateHealthCenterObs(healthCenter: HealthCenter) {
    this.healthCenterEdit = healthCenter;
    this.updateHealthCenterSubject.next(this.healthCenterEdit);
  }

  indexHealthCenters(formFilter: any, per_page: number, page: number): Observable<HealthCenter[]> {
    let url = `${URL_GLOBAL}/health-centers`;

    const params: Params = {
      per_page: per_page,
      page: page,
      health_center_order_by: 'updated_at',
      health_center_order_option: 'DESC',
      ...formFilter
    }
    return this.http.get<HealthCenter[]>(url, { params }).pipe(
      map((resp: any) => {
        resp.data = resp.data.map((e) => {
          return Object.assign(new HealthCenter, e);
        })
        resp.meta = Object.assign(new Meta, resp.meta)
        return resp;
      })
    );
  }

  storeHealthCenters(healthCenter: HealthCenter): Observable<HealthCenter> {
    let url = `${URL_GLOBAL}/health-centers`;
    return this.http.post<HealthCenter>(url, healthCenter).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  updateHealthCenters(healthCenter: HealthCenter): Observable<HealthCenter> {
    let url = `${URL_GLOBAL}/health-centers/${healthCenter.id}`;
    return this.http.put<HealthCenter>(url, healthCenter).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  destroyHealthCenters(id: number): Observable<HealthCenter> {
    let url = `${URL_GLOBAL}/health-centers/${id}`;

    return this.http.delete<HealthCenter>(url).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }
}
