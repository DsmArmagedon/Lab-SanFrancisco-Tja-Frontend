import { URL_GLOBAL } from '../config';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { TestComposed } from '../models/test-composed.model';
import { Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Study } from '../models/study.model';
import { TestComposedCollection } from '../models/test-composed-collection.model';
import { Category } from 'src/app/models/category.model';
import { Parameter } from '../models/parameter.model';
import { Unit } from '../models/unit.model';
import { FormGroup } from '@angular/forms';

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

  indexTests(formFilter: FormGroup, per_page: number, page: number): Observable<TestComposedCollection> {
    const url = `${URL_GLOBAL}/tests-composed`;

    const params: Params = {
      per_page: per_page,
      page: page,
      test_order_by: 'name',
      test_order_option: 'DESC',
      study: 'load',
      study_fields: 'name',
      ...formFilter
    }
    return this.http.get<TestComposedCollection>(url, { params }).pipe(
      map((response: any) => {
        console.log(response);
        return new TestComposedCollection(response);
      })
    );
  }

  editTests(id: number): Observable<TestComposed> {
    const url = `${URL_GLOBAL}/tests-composed/${id}`;

    const params: Params = {
      categories: 'load',
      study: 'load',
      study_fields: 'name,status'
    }

    return this.http.get<TestComposed>(url, { params }).pipe(
      map((response: any) => {
        response.data.study = new Study(response.data.study);
        response.data.study_id = response.data.study.id;
        response.data.categories = response.data.categories.map((category: Category) => new Category(category))
        return new TestComposed(response.data);
      })
    );
  }

  showTests(id: number): Observable<TestComposed> {
    const url = `${URL_GLOBAL}/tests-composed/${id}`;

    const params: Params = {
      study: 'load',
      categories: 'load',
      parameters: 'load',
      unit: 'load',
      study_fields: 'name,status',
      category_fields: 'name,print,note,status',
      test_fields: 'name,price,status',
      composed_parameter_fields: 'name,type_data,reference_values,options,default_value,status'
    }

    return this.http.get<TestComposed>(url, { params }).pipe(
      map((response: any) => {
        response.data.study = new Study(response.data.study);
        response.data.categories = response.data.categories.map((category: Category) => {
          category.parameters = category.parameters.map((parameter: Parameter) => {
            parameter.unit = new Unit(parameter.unit);
            return new Parameter(parameter);
          });
          return new Category(category);
        })
        return new TestComposed(response.data);
      })
    );
  }

  storeTests(test: TestComposed): Observable<TestComposed> {
    const url = `${URL_GLOBAL}/tests-composed`;
    return this.http.post<TestComposed>(url, test).pipe(
      map((response: any) => {
        return new TestComposed(response.data);
      })
    );
  }

  updateTests(test: TestComposed): Observable<TestComposed> {
    const url = `${URL_GLOBAL}/tests-composed/${test.id}`;
    return this.http.put<TestComposed>(url, test).pipe(
      map((response: any) => {
        return new TestComposed(response.data);
      })
    );
  }

  destroyTests(id: number): Observable<TestComposed> {
    const url = `${URL_GLOBAL}/tests-composed/${id}`;
    return this.http.delete<TestComposed>(url).pipe(
      map((response: any) => {
        return new TestComposed(response.data);
      })
    );
  }
}
