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
  private editStudySubject = new Subject<Study>();
  public editStudyObservable = this.editStudySubject.asObservable();

  studyEdit: Study = new Study;

  constructor(private http: HttpClient) { }

  editStudyObs(study: Study): void {
    this.studyEdit = study;
    this.editStudySubject.next(this.studyEdit);
  }

  indexStudies(formFilter: any, per_page: number, page: number): Observable<any> {
    let url = `${URL_GLOBAL}/studies`;

    const params: Params = {
      per_page: per_page,
      page: page,
      study_order_by: 'name',
      study_order_option: 'ASC',
      ...formFilter
    }
    return this.http.get(url, { params }).pipe(
      map( (resp: any) => {
        resp.data = resp.data.map( (e) => {
          return Object.assign(new Study, e);
        })
        resp.meta = Object.assign(new Meta, resp.meta);
        return resp;
      })
    );
  }

  storeStudies(study: Study): Observable<any> {
    let url = `${URL_GLOBAL}/studies`;
    return this.http.post(url, study).pipe(
      map( (resp: any) => {
        return resp.data;
      })
    );
  }

  updateStudies(study: Study): Observable<any> {
    let url = `${URL_GLOBAL}/studies/${study.id}`;
    return this.http.put(url, study).pipe(
      map( (resp: any) => {
        return resp.data;
      })
    );
  }

  destroyStudies(id: number): Observable<any> {
    let url = `${URL_GLOBAL}/studies/${id}`;
    return this.http.delete(url).pipe(
      map( (resp: any) => {
        return resp.data;
      })
    );
  }

  listStudies(): Observable<any> {
    let url = `${URL_GLOBAL}/studies`;

    const params: Params = {
      study_select: 'name',
      study_status: 1,
      paginate: 'disabled',
      study_order_by: 'name',
      study_order_option: 'DESC'
    }

    return this.http.get(url, { params }).pipe(
      map( (resp: any) => {
        let data = resp.data.map((e) => {
          return Object.assign(new Study, e);
        })
        return data;
      })
    );
  }
}
