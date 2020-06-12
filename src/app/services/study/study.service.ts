import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Study } from 'src/app/models/study.model';
import { URL_GLOBAL } from './../../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Meta } from 'src/app/models/meta.model';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  private updateStudySubject = new Subject<Study>();
  public updateStudyObservable = this.updateStudySubject.asObservable();

  studyEdit: Study = new Study;

  constructor(private http: HttpClient) { }

  updateStudyObs(study: Study): void {
    this.studyEdit = study;
    this.updateStudySubject.next(this.studyEdit);
  }

  indexStudies(formFilter: any, per_page: number, page: number): Observable<Study[]> {
    let url = `${URL_GLOBAL}/studies`;

    const params: Params = {
      per_page: per_page,
      page: page,
      study_order_by: 'name',
      study_order_option: 'ASC',
      ...formFilter
    }
    return this.http.get<Study[]>(url, { params }).pipe(
      map((resp: any) => {
        resp.data = resp.data.map((e) => {
          return Object.assign(new Study, e);
        })
        resp.meta = Object.assign(new Meta, resp.meta);
        return resp;
      })
    );
  }

  storeStudies(study: Study): Observable<Study> {
    let url = `${URL_GLOBAL}/studies`;
    return this.http.post<Study>(url, study).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  updateStudies(study: Study): Observable<Study> {
    let url = `${URL_GLOBAL}/studies/${study.id}`;
    return this.http.put<Study>(url, study).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  destroyStudies(id: number): Observable<Study> {
    let url = `${URL_GLOBAL}/studies/${id}`;
    return this.http.delete<Study>(url).pipe(
      map((resp: any) => {
        return resp.data;
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
        let data = resp.data.map((e) => {
          return Object.assign(new Study, e);
        })
        return data;
      })
    );
  }
}
