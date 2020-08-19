import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs'
import { Params } from '@angular/router';
import { CompanyPositionCollection } from '../models/company-position-collection.model';
import { URL_GLOBAL } from '../config';
import { CompanyPosition } from '../models/company-position.model';
import { FormGroup } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class CompanyPositionService {

  constructor(private http: HttpClient) { }

  indexCompanyPositions(formFilter: FormGroup, per_page: number, page: number): Observable<CompanyPositionCollection> {
    const url = `${URL_GLOBAL}/companies-positions`;

    const params: Params = {
      per_page: per_page,
      page: page,
      company_position_order_by: 'updated_at',
      company_position_order_option: 'DESC',
      ...formFilter
    }

    return this.http.get<CompanyPositionCollection>(url, { params }).pipe(
      map((response: any) => {
        response.data = response.data.map((companyPosition: CompanyPosition) => new CompanyPosition(companyPosition));
        return new CompanyPositionCollection(response);
      })
    );
  }

  listCompanyPositions(): Observable<CompanyPosition[]> {
    const url = `${URL_GLOBAL}/companies-positions`;
    const params: Params = {
      company_position_select: 'name',
      paginate: 'disabled',
      company_position_status: 1
    }

    return this.http.get<CompanyPosition[]>(url, { params }).pipe(
      map((response: any) => {
        return response.data.map((companyPosition: CompanyPosition) => new CompanyPosition(companyPosition));
      })
    );
  }

  storeCompanyPositions(companyPosition: CompanyPosition): Observable<CompanyPosition> {
    const url = `${URL_GLOBAL}/companies-positions`;
    return this.http.post<CompanyPosition>(url, companyPosition).pipe(
      map((response: any) => {
        return new CompanyPosition(response.data);
      })
    );
  }

  editShowCompanyPositions(id: number): Observable<CompanyPosition> {
    const url = `${URL_GLOBAL}/companies-positions/${id}`;
    return this.http.get<CompanyPosition>(url).pipe(
      map((response: any) => {
        return new CompanyPosition(response.data);
      })
    );
  }

  updateCompanyPositions(companyPosition: CompanyPosition): Observable<CompanyPosition> {
    const url = `${URL_GLOBAL}/companies-positions/${companyPosition.id}`;
    return this.http.put<CompanyPosition>(url, companyPosition).pipe(
      map((response: any) => {
        return new CompanyPosition(response.data);
      })
    );
  }

  destroyCompanyPositions(id: number): Observable<CompanyPosition> {
    const url = `${URL_GLOBAL}/companies-positions/${id}`;

    return this.http.delete<CompanyPosition>(url).pipe(
      map((response: any) => {
        return new CompanyPosition(response.data);
      })
    );
  }
}
