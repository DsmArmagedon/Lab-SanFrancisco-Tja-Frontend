import { URL_GLOBAL } from '../config';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';
import { Category } from '../models/category.model';
import { KindHttp } from '../global-variables';

interface IIdNameTestSelected {
  id: number,
  name: string
}

interface ICategoryKindHttp {
  category: Category,
  kind: KindHttp
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private idNameCategorySelectedSubject = new Subject<IIdNameTestSelected>();
  public idNameCategorySelectedObservable = this.idNameCategorySelectedSubject.asObservable();

  private updatedIndexToCategoryFromModalSubject = new Subject<ICategoryKindHttp>();
  public updatedIndexToCategoryFromModalObservable = this.updatedIndexToCategoryFromModalSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Permite enviar el nuevo valor al observable, con el id y el name de la categoria seleccionada.
   * 
   * @param id number
   * @param name string
   */
  changeIdNameCategorySelected(id: number, name: string) {
    this.idNameCategorySelectedSubject.next({ id: id, name: name });
  }

  addCategoryToIndexFromModal(category: Category, kind: KindHttp) {
    this.updatedIndexToCategoryFromModalSubject.next({
      category,
      kind
    });
  }

  indexCategories(testId: number): Observable<Category[]> {
    const url = `${URL_GLOBAL}/tests-composed/${testId}/categories`;
    return this.http.get<Category[]>(url).pipe(
      map((response: any) => {
        return response.data.map((category: Category) => new Category(category));
      })
    );
  }

  storeCategories(category: Category): Observable<Category> {
    const url = `${URL_GLOBAL}/tests-composed/${category.test_id}/categories`;
    return this.http.post<Category>(url, category).pipe(
      map((response: any) => {
        return new Category(response.data);
      })
    );
  }

  updateCategories(category: Category): Observable<Category> {
    const url = `${URL_GLOBAL}/tests-composed/${category.test_id}/categories/${category.id}`;
    return this.http.put<Category>(url, category).pipe(
      map((response: any) => {
        return new Category(response.data);
      })
    );
  }

  destroyCategories(testId: number, id: number): Observable<Category> {
    const url = `${URL_GLOBAL}/tests-composed/${testId}/categories/${id}`;
    return this.http.delete<Category>(url).pipe(
      map((response: any) => {
        return new Category(response.data);
      })
    );
  }

  listCategories(testId: number): Observable<Category[]> {
    const url = `${URL_GLOBAL}/tests-composed/${testId}/categories`;
    const params: Params = {
      category_fields: 'name',
      category_status: 1
    }
    return this.http.get<Category[]>(url, { params }).pipe(
      map((response: any) => {
        return response.data.map((category: Category) => new Category(category));
      })
    );
  }
}
