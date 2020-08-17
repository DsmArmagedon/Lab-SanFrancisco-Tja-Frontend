
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { URL_GLOBAL, GRANT_TYPE, CLIENT_ID, CLIENT_SECRET } from '../config';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }
  login(username: string, password: string): any {
    let url = `${URL_GLOBAL}/login`;
    let login = {
      'grant_type': GRANT_TYPE,
      'client_id': CLIENT_ID,
      'client_secret': CLIENT_SECRET,
      'username': username,
      'password': password
    };
    return this.http.post(url, login).pipe(
      map(resp => resp),
      catchError(
        (err: HttpErrorResponse) => {
          return throwError(err);
        }
      )
    );
  }

  privileges(): Observable<any> {
    let url = `${URL_GLOBAL}/privileges`;
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`
    });
    return this.http.get(url, { headers }).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

}
