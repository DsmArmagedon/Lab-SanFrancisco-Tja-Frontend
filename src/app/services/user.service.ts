import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { CompanyPosition } from '../models/company-position.model';
import { UserCollection } from '../models/user-collection.model';
import { URL_GLOBAL } from '../config';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  indexUsers(formFilter: FormGroup, per_page: number, page: number = 1): Observable<UserCollection> {
    const url = `${URL_GLOBAL}/users`;
    const params: Params = {
      role: 'load',
      company_position: 'load',
      role_fields: 'name',
      company_position_fields: 'name',
      page: page,
      per_page: per_page,
      user_order_by: 'updated_at',
      user_order_option: 'DESC',
      ...formFilter
    }
    return this.http.get<UserCollection>(url, { params }).pipe(
      map((response: any) => {
        response.data = response.data.map((user: User) => {
          user.companyPosition = new CompanyPosition(user.companyPosition);
          user.role = new Role(user.role);
          return new User(user);
        });
        return new UserCollection(response);
      })
    );
  }

  editShowUsers(ci: string): Observable<User> {
    const url = `${URL_GLOBAL}/users/${ci}`;
    const params: Params = {
      role: 'load',
      role_fields: 'name,status',
      company_position: 'load',
      company_position_fields: 'name,status'
    }
    return this.http.get<User>(url, { params }).pipe(
      map((response: any) => {
        response.data.companyPosition = new CompanyPosition(response.data.companyPosition);
        response.data.role = new Role(response.data.role);
        return new User(response.data);
      })
    );
  }

  storeUsers(user: User): Observable<User> {
    const url = `${URL_GLOBAL}/users`;
    return this.http.post<User>(url, this.toFormData(user.toJSON())).pipe(
      map((response: any) => {
        return new User(response.data);
      })
    );
  }

  updateUsers(user: User): Observable<User> {
    const url = `${URL_GLOBAL}/users/${user.id}`;
    const formDataUser = this.toFormData(user.toJSON());
    formDataUser.append('_method', 'PUT');
    return this.http.post<User>(url, formDataUser).pipe(
      map((response: any) => {
        return new User(response.data);
      })
    );
  }

  destroyUsers(ci: string): Observable<User> {
    const url = `${URL_GLOBAL}/users/${ci}`;
    return this.http.delete<User>(url).pipe(
      map((response: any) => {
        return new User(response.data);
      })
    );
  }

  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }
}
