import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { URL_GLOBAL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: User;
  private userAuthenticate = new Subject<User>();
  public userAuthenticateObservable = this.userAuthenticate.asObservable();

  constructor(private http: HttpClient) {
  }

  loadUserAuth(flag: boolean = false): void {
    if (flag) {
      this.userAuth().subscribe(resp => {
        this.user = resp;
        localStorage.setItem('user', JSON.stringify(resp));
        this.userAuthenticate.next(this.user);
      });
    } else {
      let userJson = JSON.parse(localStorage.getItem('user'));
      this.user = Object.assign(new User, userJson);
      this.userAuthenticate.next(this.user);
    }
  }

  userAuth(): Observable<User> {
    let url = `${URL_GLOBAL}/profile`;
    const params = {
      role: 'load',
      role_select: 'name',
      company_position: 'load',
      company_position_select: 'name',
      user_select: 'first_name,last_name,email,images'
    }
    return this.http.get(url, { params }).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  privilegesAuthHeaders(): Observable<any> {
    let url = `${URL_GLOBAL}/privileges`;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  privilegesAuth(): Observable<any> {
    let url = `${URL_GLOBAL}/privileges`;
    const headers = new HttpHeaders({
      'Authorization': `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`
    });
    return this.http.get(url, { headers }).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }
}
