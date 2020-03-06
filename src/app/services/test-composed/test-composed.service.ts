import { URL_GLOBAL } from './../../config';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { TestComposed } from '../../models/test-composed.model';
import { Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Meta } from 'src/app/models/meta.model';

interface IIdNameTestSelected {
  id: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class TestComposedService {
 idNameTestSelected: IIdNameTestSelected;

  testComposed: TestComposed = new TestComposed;
  
  private disabledEditSubject = new Subject<boolean>();
  public disabledEditObservable = this.disabledEditSubject.asObservable();

  private selectBtnActiveSubject = new Subject<string>();
  public selectBtnActiveObservable = this.selectBtnActiveSubject.asObservable();

  private idNameTestSelectedSubject = new Subject<IIdNameTestSelected>();
  public idNameTestSelectedObservable = this.idNameTestSelectedSubject.asObservable();

  constructor(private http: HttpClient) {}

  changeDisabled(disabled: boolean) {
    this.disabledEditSubject.next(disabled);
  }

  changeSelectBtn(text: string) {
    this.selectBtnActiveSubject.next(text);
  }

  changeIdNameTestSelected(id: number, name: string) {
    this.idNameTestSelectedSubject.next({id: id, name: name});
  }

  indexTests(formFilter: any, per_page: number, page: number): Observable<any> {
    let url = `${URL_GLOBAL}/tests-composeds`;

    const params: Params = {
      per_page: per_page,
      page: page,
      test_order_by: 'name',
      test_order_option: 'DESC',
      study: 'load',
      study_select: 'name',
      ...formFilter
    }
    return this.http.get(url, { params }).pipe(
      map( (resp: any) => {
        resp.data = resp.data.map((e) => {
          return Object.assign(new TestComposed, e);
        })
        resp.meta = Object.assign(new Meta, resp.meta);
        return resp;
      })
    );
  }

  editTests(id: number): Observable<any> {
    let url = `${URL_GLOBAL}/tests-composeds/${id}`;

    const params: Params = {
      titles: 'load'
    }

    return this.http.get(url, { params }).pipe(
      map( (resp: any) => {
        return Object.assign(new TestComposed, resp.data);
      })
    );
  }

  storeTests(test: TestComposed): Observable<any> {
    let url = `${URL_GLOBAL}/tests-composeds`;
    return this.http.post(url,test).pipe(
      map( (resp: any) => {
        return resp.data;
      })
    );
  }

  updateTests(test: TestComposed): Observable<any> {
    let url = `${URL_GLOBAL}/tests-composeds/${test.id}`;
    return this.http.put(url,test).pipe(
      map( (resp: any) => {
        return resp.data;
      })
    );
  }

  destroyTests(id: number): Observable<any> {
    let url = `${URL_GLOBAL}/tests-composeds/${id}`;
    return this.http.delete(url).pipe(
      map( (resp: any) => {
        return resp.data;
      })
    );
  }
}
