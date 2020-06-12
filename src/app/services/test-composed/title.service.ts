import { URL_GLOBAL } from './../../config';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';
import { Title } from 'src/app/models/title.model';

interface IIdNameTestSelected {
  id: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private idNameTitleSelectedSubject = new Subject<IIdNameTestSelected>();
  public idNameTitleSelectedObservable = this.idNameTitleSelectedSubject.asObservable();

  constructor(private http: HttpClient) { }

  changeIdNameTitleSelected(id: number, name: string) {
    this.idNameTitleSelectedSubject.next({ id: id, name: name });
  }

  indexTitles(test_id: number): Observable<Title[]> {
    let url = `${URL_GLOBAL}/tests-composeds/${test_id}/titles`;
    return this.http.get<Title[]>(url).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  storeTitles(title: Title): Observable<Title> {
    let url = `${URL_GLOBAL}/tests-composeds/${title.test_id}/titles`;
    return this.http.post<Title>(url, title).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  updateTitles(title: Title): Observable<Title> {
    let url = `${URL_GLOBAL}/tests-composeds/${title.test_id}/titles/${title.id}`;
    return this.http.put<Title>(url, title).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  listTitles(test_id: number): Observable<Title> {
    let url = `${URL_GLOBAL}/tests-composeds/${test_id}/titles`;
    const params: Params = {
      title_select: 'name',
      title_status: 1
    }
    return this.http.get<Title[]>(url, { params }).pipe(
      map((resp: any) => {
        let data = resp.data.map((e) => {
          return Object.assign(new Title, e);
        })
        return data;
      })
    );
  }
}
