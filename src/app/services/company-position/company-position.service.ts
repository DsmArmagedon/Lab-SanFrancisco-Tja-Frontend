import { HttpClient } from '@angular/common/http';
import { URL_GLOBAL } from '../../config';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { CompanyPosition } from '../../models/company-position.model';
import { Meta } from 'src/app/models/meta.model';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompanyPositionService {

  private updateCompanyPositionSubject = new Subject<CompanyPosition>();
  public updateCompanyPositionObservable = this.updateCompanyPositionSubject.asObservable();

  companyPositionEdit: CompanyPosition = new CompanyPosition;
  constructor(private http: HttpClient) { }

  updateCompanyPositionObs(companyPosition: CompanyPosition) {
    this.companyPositionEdit = companyPosition;
    this.updateCompanyPositionSubject.next(this.companyPositionEdit);
  }
  indexCompanyPositions(formFilter: any, per_page: number, page: number): Observable<CompanyPosition[]> {
    let url = `${URL_GLOBAL}/companies-positions`;

    const params: Params = {
      per_page: per_page,
      page: page,
      company_position_order_by: 'updated_at',
      company_position_order_option: 'DESC',
      ...formFilter
    }

    return this.http.get<CompanyPosition[]>(url, { params }).pipe(
      map((resp: any) => {
        resp.data = resp.data.map((e) => {
          return Object.assign(new CompanyPosition, e);
        })
        resp.meta = Object.assign(new Meta, resp.meta)
        return resp;
      })
    );
  }


  listCompanyPositions(): Observable<CompanyPosition[]> {
    let url = `${URL_GLOBAL}/companies-positions`;
    const params: Params = {
      company_position_select: 'name',
      paginate: 'disabled',
      company_position_status: 1
    }

    return this.http.get<CompanyPosition[]>(url, { params }).pipe(
      map((resp: any) => {
        let data = resp.data.map(function (e) {
          return Object.assign(new CompanyPosition, e);
        });
        return data;
      })
    );
  }

  storeCompanyPositions(companyPosition: CompanyPosition): Observable<CompanyPosition> {
    let url = `${URL_GLOBAL}/companies-positions`;
    return this.http.post<CompanyPosition>(url, companyPosition).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  updateCompanyPositions(companyPosition: CompanyPosition): Observable<CompanyPosition> {
    let url = `${URL_GLOBAL}/companies-positions/${companyPosition.id}`;
    return this.http.put<CompanyPosition>(url, companyPosition).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  destroyCompanyPositions(id: number): Observable<CompanyPosition> {
    let url = `${URL_GLOBAL}/companies-positions/${id}`;

    return this.http.delete<CompanyPosition>(url).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }
}
