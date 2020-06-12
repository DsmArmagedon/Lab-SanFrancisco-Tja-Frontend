import { URL_GLOBAL } from '../../config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role, RoleMetaLinks } from 'src/app/models/role.model';
import { map } from 'rxjs/operators';
import { Permission } from 'src/app/models/permission.model';
import { Meta } from '../../models/meta.model';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  indexRoles(formFilter: any, per_page: number, page: number): Observable<RoleMetaLinks> {
    let url = `${URL_GLOBAL}/roles`;
    const params: Params = {
      role_select: 'name,description,status',
      per_page: per_page,
      page: page,
      role_order_by: 'updated_at',
      role_order_option: 'DESC',
      ...formFilter
    }
    return this.http.get<RoleMetaLinks>(url, { params }).pipe(
      map((resp: any) => {
        resp.data = resp.data.map(function (e) {
          return Object.assign(new Role, e);
        });

        resp.meta = Object.assign(new Meta, resp.meta);
        return resp;
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
        let data = resp.data.map(function (e) {
          return Object.assign(new Role, e);
        });
        return data;
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
        let role: Role = Object.assign(new Role, resp.data);
        role.permissions = resp.data.permissions.map((e) => {
          return Object.assign(new Permission, e);
        })
        return role;
      })
    )
  }

  storeRoles(role: Role): Observable<Role> {
    let url = `${URL_GLOBAL}/roles`;
    return this.http.post<Role>(url, role).pipe(
      map((resp: any) => {
        return resp.data
      })
    );
  }

  updateRoles(role: Role): Observable<Role> {
    let url = `${URL_GLOBAL}/roles/${role.id}`;

    return this.http.put<Role>(url, role).pipe(
      map((resp: any) => {
        return resp.data;
      })
    )
  }

  destroyRoles(id: number): Observable<Role> {
    let url = `${URL_GLOBAL}/roles/${id}`;

    return this.http.delete<Role>(url).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }
}
