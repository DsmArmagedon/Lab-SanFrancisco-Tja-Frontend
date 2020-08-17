import { URL_GLOBAL } from '../config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';
import { Role } from '../models/role.model';
import { RoleCollection } from '../models/role-collection.model';
import { Permission } from '../models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  indexRoles(formFilter: any, per_page: number, page: number): Observable<RoleCollection> {
    let url = `${URL_GLOBAL}/roles`;
    const params: Params = {
      role_select: 'name,description,status',
      per_page: per_page,
      page: page,
      role_order_by: 'updated_at',
      role_order_option: 'DESC',
      ...formFilter
    }
    return this.http.get<RoleCollection>(url, { params }).pipe(
      map((resp: any) => {
        resp.data = resp.data.map((role: Role) => Object.assign(new Role, role));
        return Object.assign(new RoleCollection, resp);
      })
    );
  }

  listRoles(): Observable<Role[]> {
    let url = `${URL_GLOBAL}/roles`;
    const params: Params = {
      role_select: 'name',
      role_status: 1,
      paginate: 'disabled'
    }
    return this.http.get<Role[]>(url, { params }).pipe(
      map((resp: any) => {
        return resp.data.map((role: Role) => Object.assign(new Role, role));
      })
    )
  }

  editShowRoles(id: number): Observable<Role> {
    let url = `${URL_GLOBAL}/roles/${id}`;

    const params = {
      permission: 'load',
      permission_select: 'name,slug'
    }

    return this.http.get<Role>(url, { params }).pipe(
      map((resp: any) => {
        resp.data.permissions = resp.data.permissions.map((permission: Permission) => Object.assign(new Permission, permission));
        return Object.assign(new Role, resp.data);
      })
    )
  }

  storeRoles(role: Role): Observable<Role> {
    let url = `${URL_GLOBAL}/roles`;
    return this.http.post<Role>(url, role).pipe(
      map((resp: any) => {
        return Object.assign(new Role, resp.data)
      })
    );
  }

  updateRoles(role: Role): Observable<Role> {
    let url = `${URL_GLOBAL}/roles/${role.id}`;

    return this.http.put<Role>(url, role).pipe(
      map((resp: any) => {
        return Object.assign(new Role, resp.data);
      })
    )
  }

  destroyRoles(id: number): Observable<Role> {
    let url = `${URL_GLOBAL}/roles/${id}`;

    return this.http.delete<Role>(url).pipe(
      map((resp: any) => {
        return Object.assign(new Role, resp.data);
      })
    );
  }
}
