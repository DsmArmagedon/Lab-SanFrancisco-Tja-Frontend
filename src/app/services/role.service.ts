import { URL_GLOBAL } from '../config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';
import { Role } from '../models/role.model';
import { RoleCollection } from '../models/role-collection.model';
import { Permission } from '../models/permission.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  indexRoles(formFilter: FormGroup, per_page: number, page: number): Observable<RoleCollection> {
    const url = `${URL_GLOBAL}/roles`;
    const params: Params = {
      role_select: 'name,description,status',
      per_page: per_page,
      page: page,
      role_order_by: 'updated_at',
      role_order_option: 'DESC',
      ...formFilter
    }
    return this.http.get<RoleCollection>(url, { params }).pipe(
      map((response: any) => {
        response.data = response.data.map((role: Role) => new Role(role));
        return new RoleCollection(response);
      })
    );
  }

  listRoles(): Observable<Role[]> {
    const url = `${URL_GLOBAL}/roles`;
    const params: Params = {
      role_select: 'name',
      role_status: 1,
      paginate: 'disabled'
    }
    return this.http.get<Role[]>(url, { params }).pipe(
      map((response: any) => {
        return response.data.map((role: Role) => Object.assign(new Role, role));
      })
    )
  }

  editShowRoles(id: number): Observable<Role> {
    const url = `${URL_GLOBAL}/roles/${id}`;

    const params = {
      permission: 'load',
      permission_select: 'name,slug'
    }

    return this.http.get<Role>(url, { params }).pipe(
      map((response: any) => {
        response.data.permissions = response.data.permissions.map((permission: Permission) => Object.assign(new Permission, permission));
        return Object.assign(new Role, response.data);
      })
    )
  }

  storeRoles(role: Role): Observable<Role> {
    const url = `${URL_GLOBAL}/roles`;
    return this.http.post<Role>(url, role).pipe(
      map((response: any) => {
        return Object.assign(new Role, response.data)
      })
    );
  }

  updateRoles(role: Role): Observable<Role> {
    const url = `${URL_GLOBAL}/roles/${role.id}`;

    return this.http.put<Role>(url, role).pipe(
      map((response: any) => {
        return Object.assign(new Role, response.data);
      })
    )
  }

  destroyRoles(id: number): Observable<Role> {
    const url = `${URL_GLOBAL}/roles/${id}`;

    return this.http.delete<Role>(url).pipe(
      map((response: any) => {
        return Object.assign(new Role, response.data);
      })
    );
  }
}
