import { URL_GLOBAL } from './../../config';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Unit } from 'src/app/models/unit.model';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { Meta } from 'src/app/models/meta.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  private updateUnitSubject = new Subject<Unit>();
  public updateUnitObservable = this.updateUnitSubject.asObservable();

  unitEdit: Unit = new Unit;

  constructor(private http: HttpClient) { }

  updateUnitObs(unit: Unit) {
    this.unitEdit = unit;
    this.updateUnitSubject.next(this.unitEdit);
  }

  indexUnits(formFilter: any, per_page: number, page: number): Observable<Unit[]> {
    let url = `${URL_GLOBAL}/units`;

    const params: Params = {
      per_page: per_page,
      page: page,
      ...formFilter
    }

    return this.http.get<Unit[]>(url, { params }).pipe(
      map((resp: any) => {
        resp.data = resp.data.map((e) => {
          return Object.assign(new Unit, e);
        });
        resp.meta = Object.assign(new Meta, resp.meta);
        return resp;
      })
    );
  }

  storeUnits(unit: Unit): Observable<Unit> {
    let url = `${URL_GLOBAL}/units`;
    return this.http.post<Unit>(url, unit).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  updateUnits(unit: Unit): Observable<Unit> {
    let url = `${URL_GLOBAL}/units/${unit.id}`;
    return this.http.put<Unit>(url, unit).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  destroyUnits(id: number): Observable<Unit> {
    let url = `${URL_GLOBAL}/units/${id}`;
    return this.http.delete<Unit>(url).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  listUnits(): Observable<Unit[]> {
    let url = `${URL_GLOBAL}/units`;
    const params: Params = {
      unit_select: 'name,display',
      unit_status: 1,
      paginate: 'disabled',
      unit_order_by: 'name',
      unit_order_option: 'ASC'
    }
    return this.http.get<Unit[]>(url, { params }).pipe(
      map((resp: any) => {
        let data = resp.data.map((e) => {
          return Object.assign(new Unit, e);
        })
        return data;
      })
    );
  }
}
