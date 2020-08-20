import { URL_GLOBAL } from '../config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { Unit } from '../models/unit.model';
import { UnitCollection } from '../models/unit-collection.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http: HttpClient) { }

  indexUnits(formFilter: FormGroup, per_page: number, page: number): Observable<UnitCollection> {
    const url = `${URL_GLOBAL}/units`;

    const params: Params = {
      per_page: per_page,
      page: page,
      ...formFilter
    }

    return this.http.get<UnitCollection>(url, { params }).pipe(
      map((response: any) => {
        response.data = response.data.map((unit: Unit) => new Unit(unit));
        return new UnitCollection(response);
      })
    );
  }

  storeUnits(unit: Unit): Observable<Unit> {
    const url = `${URL_GLOBAL}/units`;
    return this.http.post<Unit>(url, unit).pipe(
      map((response: any) => {
        return new Unit(response.data);
      })
    );
  }

  editShowUnits(id: number): Observable<Unit> {
    const url = `${URL_GLOBAL}/units/${id}`;
    return this.http.get<Unit>(url).pipe(
      map((response: any) => {
        return new Unit(response.data);
      })
    );
  }

  updateUnits(unit: Unit): Observable<Unit> {
    const url = `${URL_GLOBAL}/units/${unit.id}`;
    return this.http.put<Unit>(url, unit).pipe(
      map((response: any) => {
        return new Unit(response.data);
      })
    );
  }

  destroyUnits(id: number): Observable<Unit> {
    const url = `${URL_GLOBAL}/units/${id}`;
    return this.http.delete<Unit>(url).pipe(
      map((response: any) => {
        return new Unit(response.data);
      })
    );
  }

  listUnits(): Observable<Unit[]> {
    const url = `${URL_GLOBAL}/units`;
    const params: Params = {
      unit_select: 'name,display',
      unit_status: 1,
      paginate: 'disabled',
      unit_order_by: 'name',
      unit_order_option: 'ASC'
    }
    return this.http.get<Unit[]>(url, { params }).pipe(
      map((response: any) => {
        return response.data.map((unit: Unit) => new Unit(unit));
      })
    );
  }
}
