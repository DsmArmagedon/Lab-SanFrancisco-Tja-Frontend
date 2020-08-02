import { HttpClient } from '@angular/common/http';
import { URL_GLOBAL } from '../../config';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CompanyPosition } from '../../models/company-position/company-position.model';
import { Params } from '@angular/router';
import { CompanyPositionCollection } from 'src/app/models/company-position/company-position-collection.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyPositionService {

  constructor(private http: HttpClient) { }

  indexCompanyPositions(formFilter: any, per_page: number, page: number): Observable<CompanyPositionCollection> {
    let url = `${URL_GLOBAL}/companies-positions`;

    const params: Params = {
      per_page: per_page,
      page: page,
      company_position_order_by: 'updated_at',
      company_position_order_option: 'DESC',
      ...formFilter
    }

    return this.http.get<CompanyPositionCollection>(url, { params }).pipe(
      map((resp: any) => {
        resp.data = resp.data.map((companyPosition: CompanyPosition) => Object.assign(new CompanyPosition, companyPosition));
        return Object.assign(new CompanyPositionCollection, resp)
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
        return resp.data.map((companyPosition: CompanyPosition) => Object.assign(new CompanyPosition, companyPosition));
      })
    );
  }

  storeCompanyPositions(companyPosition: CompanyPosition): Observable<CompanyPosition> {
    let url = `${URL_GLOBAL}/companies-positions`;
    return this.http.post<CompanyPosition>(url, companyPosition).pipe(
      map((resp: any) => {
        return Object.assign(new CompanyPosition, resp.data);
      })
    );
  }

  editShowCompanyPositions(id: number): Observable<CompanyPosition> {
    let url = `${URL_GLOBAL}/companies-positions/${id}`;
    return this.http.get<CompanyPosition>(url).pipe(
      map((resp: any) => {
        return Object.assign(new CompanyPosition, resp.data);
      })
    );
  }

  updateCompanyPositions(companyPosition: CompanyPosition): Observable<CompanyPosition> {
    let url = `${URL_GLOBAL}/companies-positions/${companyPosition.id}`;
    return this.http.put<CompanyPosition>(url, companyPosition).pipe(
      map((resp: any) => {
        return Object.assign(new CompanyPosition, resp.data);
      })
    );
  }

  destroyCompanyPositions(id: number): Observable<CompanyPosition> {
    let url = `${URL_GLOBAL}/companies-positions/${id}`;

    return this.http.delete<CompanyPosition>(url).pipe(
      map((resp: any) => {
        return Object.assign(new CompanyPosition, resp.data);
      })
    );
  }
}
