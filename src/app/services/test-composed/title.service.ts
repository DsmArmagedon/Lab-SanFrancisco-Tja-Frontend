import { URL_GLOBAL } from './../../config';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
    this.idNameTitleSelectedSubject.next({id: id, name: name});
  }

  indexTitles(id: number): Observable<any> {
    let url = `${URL_GLOBAL}/tests-composeds/${id}/titles`;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }
}
