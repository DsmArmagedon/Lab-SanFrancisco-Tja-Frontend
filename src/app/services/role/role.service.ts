import { URL_GLOBAL } from '../../config';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/models/role.model';
import { map } from 'rxjs/operators';
import { Permission } from 'src/app/models/permission.model';
import { Meta } from '../../models/meta.model';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleService {


  /**
   * Activar y desactivar el boton de editar
   */
  private disabledUpdateSubject = new Subject<boolean>();
  public disabledUpdateObservable = this.disabledUpdateSubject.asObservable();

  private selectBtnActiveSubject = new Subject<string>();
  public selectBtnActiveObservable = this.selectBtnActiveSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Observable para activar y desactivar el boton editar
   * @param disabled 
   */
  changeDisabled(disabled: boolean){
    this.disabledUpdateSubject.next(disabled);
  }

  changeSelectBtn(text: string) {
    this.selectBtnActiveSubject.next(text);
  }

  indexRoles(formFilter:any, per_page: number, page: number):Observable<any> {
    let url = `${URL_GLOBAL}/roles`;
    const params: Params = {
      role_select: 'name,description,status',
      per_page: per_page,
      page: page,
      role_order_by: 'updated_at',
      role_order_option: 'DESC',
      ...formFilter
    }
    return this.http.get(url, { params }).pipe(
      map( ( resp: any ) => {
        resp.data = resp.data.map(function(e) {
          return Object.assign(new Role, e);
        });

        resp.meta = Object.assign(new Meta, resp.meta);
        return resp;
      })
    );
  }

  listRoles():Observable<any> {
    let url = `${URL_GLOBAL}/roles`;
    const params: Params = {
      role_select: 'name',
      role_status: 1,
      paginate: 'disabled'
    }
    return this.http.get(url, { params }).pipe(
      map(( resp: any ) => {
        let data = resp.data.map(function(e) {
          return Object.assign(new Role, e);
        });
        return data;
      })
    )
  }

  editShowRoles(id: number): Observable<any> {
    let url = `${URL_GLOBAL}/roles/${id}`;

    const params = {
      permission: 'load',
      permission_select: 'name,slug'
    }

    return this.http.get(url, { params }).pipe(
      map( (resp: any) => {
        let role: Role = Object.assign(new Role, resp.data);
        role.permissions = resp.data.permissions.map((e)=> {
          return Object.assign(new Permission,e);
        })
        return role;
      })
    )
  }

  storeRoles(role: Role): Observable<any>  {
    let url = `${URL_GLOBAL}/roles`;
    return this.http.post(url, role).pipe(
      map( (resp: any) => {
        return resp.data
      })
    );
  }

  updateRoles(role: Role): Observable<any>  {
    let url = `${URL_GLOBAL}/roles/${role.id}`;

    return this.http.put(url, role).pipe(
      map( (resp:any) => {
        return resp.data;
      } )
    )
  }

  destroyRoles(id: number): Observable<any>  {
    let url = `${URL_GLOBAL}/roles/${id}`;

    return this.http.delete(url).pipe(
      map( (resp: any) => {
        return resp.data;
      })
    );
  }
}
