import { URL_GLOBAL } from './../../config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Unit, UnitCollection } from 'src/app/models/unit.model';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http: HttpClient) { }

  indexUnits(formFilter: any, per_page: number, page: number): Observable<UnitCollection> {
    let url = `${URL_GLOBAL}/units`;

    const params: Params = {
      per_page: per_page,
      page: page,
      ...formFilter
    }

    return this.http.get<UnitCollection>(url, { params }).pipe(
      map((resp: any) => {
        return Object.assign(new UnitCollection, resp);
      })
    );
  }

  storeUnits(unit: Unit): Observable<Unit> {
    let url = `${URL_GLOBAL}/units`;
    return this.http.post<Unit>(url, unit).pipe(
      map((resp: any) => {
        return Object.assign(new Unit, resp.data);
      })
    );
  }

  editShowUnits(id: number): Observable<Unit> {
    let url = `${URL_GLOBAL}/units/${id}`;
    console.log(url);
    return this.http.get<Unit>(url).pipe(
      map((resp: any) => {
        return Object.assign(new Unit, resp.data);
      })
    );
  }

  updateUnits(unit: Unit): Observable<Unit> {
    let url = `${URL_GLOBAL}/units/${unit.id}`;
    return this.http.put<Unit>(url, unit).pipe(
      map((resp: any) => {
        return Object.assign(new Unit, resp.data);
      })
    );
  }

  destroyUnits(id: number): Observable<Unit> {
    let url = `${URL_GLOBAL}/units/${id}`;
    return this.http.delete<Unit>(url).pipe(
      map((resp: any) => {
        return Object.assign(new Unit, resp.data);
      })
    );
  }

  listUnits(): Observable<UnitCollection> {
    let url = `${URL_GLOBAL}/units`;
    const params: Params = {
      unit_select: 'name,display',
      unit_status: 1,
      paginate: 'disabled',
      unit_order_by: 'name',
      unit_order_option: 'ASC'
    }
    return this.http.get<UnitCollection>(url, { params }).pipe(
      map((resp: any) => {
        return Object.assign(new UnitCollection, resp);
      })
    );
  }
}
