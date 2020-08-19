import { URL_GLOBAL } from '../config';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';
import { Title } from '../models/title.model';
import { KindHttp } from '../global-variables';

interface IIdNameTestSelected {
  id: number,
  name: string
}

interface ITitleKindHttp {
  title: Title,
  kind: KindHttp
}

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private idNameTitleSelectedSubject = new Subject<IIdNameTestSelected>();
  public idNameTitleSelectedObservable = this.idNameTitleSelectedSubject.asObservable();

  private updatedIndexToTitleFromModalSubject = new Subject<ITitleKindHttp>();
  public updatedIndexToTitleFromModalObservable = this.updatedIndexToTitleFromModalSubject.asObservable();


  constructor(private http: HttpClient) { }

  /**
   * Permite enviar el nuevo valor al observable, con el id y el name del título seleccionado.
   * 
   * @param id number
   * @param name string
   */
  changeIdNameTitleSelected(id: number, name: string) {
    this.idNameTitleSelectedSubject.next({ id: id, name: name });
  }

  addTitleToIndexFromModal(title: Title, kind: KindHttp) {
    this.updatedIndexToTitleFromModalSubject.next({
      title: title,
      kind: kind
    });
  }

  indexTitles(testId: number): Observable<Title[]> {
    const url = `${URL_GLOBAL}/tests-composeds/${testId}/titles`;
    return this.http.get<Title[]>(url).pipe(
      map((response: any) => {
        return response.data.map((title: Title) => new Title(title));
      })
    );
  }

  storeTitles(title: Title): Observable<Title> {
    const url = `${URL_GLOBAL}/tests-composeds/${title.test_id}/titles`;
    return this.http.post<Title>(url, title).pipe(
      map((response: any) => {
        return new Title(response.data);
      })
    );
  }

  updateTitles(title: Title): Observable<Title> {
    const url = `${URL_GLOBAL}/tests-composeds/${title.test_id}/titles/${title.id}`;
    return this.http.put<Title>(url, title).pipe(
      map((response: any) => {
        return new Title(response.data);
      })
    );
  }

  destroyTitles(testId: number, id: number): Observable<Title> {
    const url = `${URL_GLOBAL}/tests-composeds/${testId}/titles/${id}`;
    return this.http.delete<Title>(url).pipe(
      map((response: any) => {
        return new Title(response.data);
      })
    );
  }

  listTitles(testId: number): Observable<Title[]> {
    const url = `${URL_GLOBAL}/tests-composeds/${testId}/titles`;
    const params: Params = {
      title_select: 'name',
      title_status: 1
    }
    return this.http.get<Title[]>(url, { params }).pipe(
      map((response: any) => {
        return response.data.map((title: Title) => new Title(title));
      })
    );
  }
}
