import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Study } from '../models/study.model';
import { URL_GLOBAL } from '../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';
import { StudyCollection } from '../models/study-collection.model';

@Injectable({
  providedIn: 'root'
})
export class StudyService {

  constructor(private http: HttpClient) { }

  indexStudies(formFilter: any, per_page: number, page: number): Observable<StudyCollection> {
    let url = `${URL_GLOBAL}/studies`;

    const params: Params = {
      per_page: per_page,
      page: page,
      study_order_by: 'name',
      study_order_option: 'ASC',
      ...formFilter
    }
    return this.http.get<StudyCollection>(url, { params }).pipe(
      map((resp: any) => {
        resp.data = resp.data.map((study: Study) => Object.assign(new Study, study));
        return Object.assign(new StudyCollection, resp);
      })
    );
  }

  storeStudies(study: Study): Observable<Study> {
    let url = `${URL_GLOBAL}/studies`;
    return this.http.post<Study>(url, study).pipe(
      map((resp: any) => {
        return Object.assign(new Study, resp.data);
      })
    );
  }

  editShowStudies(id: number): Observable<Study> {
    let url = `${URL_GLOBAL}/studies/${id}`;
    return this.http.get<Study>(url).pipe(
      map((resp: any) => {
        return Object.assign(new Study, resp.data);
      })
    );
  }

  updateStudies(study: Study): Observable<Study> {
    let url = `${URL_GLOBAL}/studies/${study.id}`;
    return this.http.put<Study>(url, study).pipe(
      map((resp: any) => {
        return Object.assign(new Study, resp.data);
      })
    );
  }

  destroyStudies(id: number): Observable<Study> {
    let url = `${URL_GLOBAL}/studies/${id}`;
    return this.http.delete<Study>(url).pipe(
      map((resp: any) => {
        return Object.assign(new Study, resp.data);
      })
    );
  }

  listStudies(): Observable<Study[]> {
    let url = `${URL_GLOBAL}/studies`;

    const params: Params = {
      study_select: 'name',
      study_status: 1,
      paginate: 'disabled',
      study_order_by: 'name',
      study_order_option: 'DESC'
    }

    return this.http.get<Study[]>(url, { params }).pipe(
      map((resp: any) => {
        return resp.data.map((study: Study) => Object.assign(new Study, study));
      })
    );
  }
}
