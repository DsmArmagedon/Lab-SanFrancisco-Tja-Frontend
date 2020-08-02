import { Observable } from 'rxjs';
import { URL_GLOBAL } from '../../config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';
import { CompanyPosition } from 'src/app/models/company-position/company-position.model';
import { Role } from 'src/app/models/role/role.model';
import { UserCollection } from 'src/app/models/user/user-collection.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  indexUsers(formFilter: any, per_page: number, page: number = 1): Observable<UserCollection> {
    let url = `${URL_GLOBAL}/users`;
    const params: Params = {
      role: 'load',
      company_position: 'load',
      role_select: 'name',
      company_position_select: 'name',
      page: page,
      per_page: per_page,
      user_order_by: 'updated_at',
      user_order_option: 'DESC',
      ...formFilter
    }
    return this.http.get<UserCollection>(url, { params }).pipe(
      map((resp: any) => {
        resp.data = resp.data.map((user: User) => {
          user.companyPosition = Object.assign(new CompanyPosition, user.companyPosition);
          user.role = Object.assign(new Role, user.role);
          return Object.assign(new User, user);
        });
        return Object.assign(new UserCollection, resp);
      })
    );
  }

  editShowUsers(ci: string): Observable<User> {
    let url = `${URL_GLOBAL}/users/${ci}`;
    const params: Params = {
      role: 'load',
      role_select: 'name,status',
      company_position: 'load',
      company_position_select: 'name,status'
    }
    return this.http.get<User>(url, { params }).pipe(
      map((resp: any) => {
        resp.data.companyPosition = Object.assign(new CompanyPosition, resp.data.companyPosition);
        resp.data.role = Object.assign(new Role, resp.data.role);
        return Object.assign(new User, resp.data);
      })
    );
  }

  storeUsers(user: User): Observable<User> {
    let url = `${URL_GLOBAL}/users`;
    return this.http.post<User>(url, this.toFormData(user.toJSON())).pipe(
      map((resp: any) => {
        return Object.assign(new User, resp.data);
      })
    );
  }

  updateUsers(user: User): Observable<User> {
    let url = `${URL_GLOBAL}/users/${user.id}`;
    let formDataUser = this.toFormData(user.toJSON());
    formDataUser.append('_method', 'PUT');
    return this.http.post<User>(url, formDataUser).pipe(
      map((resp: any) => {
        return Object.assign(new User, resp.data);
      })
    );
  }

  destroyUsers(ci: string): Observable<User> {
    let url = `${URL_GLOBAL}/users/${ci}`;
    return this.http.delete<User>(url).pipe(
      map((resp: any) => {
        return Object.assign(new User, resp.data);
      })
    );
  }

  toFormData<T>(formValue: T) {
    let formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }
}
