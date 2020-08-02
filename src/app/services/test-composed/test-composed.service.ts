import { URL_GLOBAL } from './../../config';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { TestComposed } from '../../models/test-simple-composed/test-composed.model';
import { Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Study } from 'src/app/models/study/study.model';
import { TestComposedCollection } from 'src/app/models/test-simple-composed/test-composed-collection.model';
import { Title } from 'src/app/models/title/title.model';
import { Parameter } from 'src/app/models/parameter/parameter.model';
import { Unit } from 'src/app/models/unit/unit.model';

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

  private disabledShowSubject = new Subject<boolean>();
  public disabledShowObservable = this.disabledShowSubject.asObservable();

  private idNameTestSelectedSubject = new Subject<IIdNameTestSelected>();
  public idNameTestSelectedObservable = this.idNameTestSelectedSubject.asObservable();

  constructor(private http: HttpClient) { }

  changeDisabledShow(disabled: boolean) {
    this.disabledShowSubject.next(disabled);
  }

  changeIdNameTestSelected(id: number, name: string) {
    this.idNameTestSelectedSubject.next({ id: id, name: name });
  }

  indexTests(formFilter: any, per_page: number, page: number): Observable<TestComposedCollection> {
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
    return this.http.get<TestComposedCollection>(url, { params }).pipe(
      map((resp: any) => {
        return Object.assign(new TestComposedCollection, resp);
      })
    );
  }

  editTests(id: number): Observable<TestComposed> {
    let url = `${URL_GLOBAL}/tests-composeds/${id}`;

    const params: Params = {
      titles: 'load',
      study: 'load',
      study_select: 'name,status'
    }

    return this.http.get<TestComposed>(url, { params }).pipe(
      map((resp: any) => {
        resp.data.study = Object.assign(new Study, resp.data.study);
        resp.data.study_id = resp.data.study.id;
        resp.data.titles = resp.data.titles.map((title: Title) => Object.assign(new Title, title))
        return Object.assign(new TestComposed, resp.data);
      })
    );
  }

  showTests(id: number): Observable<TestComposed> {
    let url = `${URL_GLOBAL}/tests-composeds/${id}`;

    const params: Params = {
      study: 'load',
      titles: 'load',
      parameters: 'load',
      unit: 'load',
      study_select: 'name,status',
      title_select: 'name,print,note,status',
      test_select: 'name,price,status',
      parameter_select: 'name,type_data,reference_values,options,default_value,status'
    }

    return this.http.get<TestComposed>(url, { params }).pipe(
      map((resp: any) => {
        resp.data.study = Object.assign(new Study, resp.data.study);
        resp.data.titles = resp.data.titles.map((title: Title) => {
          title.parameters = title.parameters.map((parameter: Parameter) => {
            parameter.unit = Object.assign(new Unit, parameter.unit);
            return Object.assign(new Parameter, parameter);
          });
          return Object.assign(new Title, title);
        })
        return Object.assign(new TestComposed, resp.data);
      })
    );
  }

  storeTests(test: TestComposed): Observable<TestComposed> {
    let url = `${URL_GLOBAL}/tests-composeds`;
    return this.http.post<TestComposed>(url, test).pipe(
      map((resp: any) => {
        return Object.assign(new TestComposed, resp.data);
      })
    );
  }

  updateTests(test: TestComposed): Observable<TestComposed> {
    let url = `${URL_GLOBAL}/tests-composeds/${test.id}`;
    return this.http.put<TestComposed>(url, test).pipe(
      map((resp: any) => {
        return Object.assign(new TestComposed, resp.data);
      })
    );
  }

  destroyTests(id: number): Observable<TestComposed> {
    let url = `${URL_GLOBAL}/tests-composeds/${id}`;
    return this.http.delete<TestComposed>(url).pipe(
      map((resp: any) => {
        return Object.assign(new TestComposed, resp.data);
      })
    );
  }
}
