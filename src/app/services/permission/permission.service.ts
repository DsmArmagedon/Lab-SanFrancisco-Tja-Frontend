import { URL_GLOBAL } from '../../config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permission } from '../../models/permission.model';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  listPermissions(): Observable<any> {
    let url = `${URL_GLOBAL}/permissions`;
    const params: Params = {
      permission_select: 'name,description,slug',
      permission_status: 1,
      paginate: 'disabled'
    }
    return this.http.get(url, { params }).pipe(
      map( (resp: any) => {
        let data = resp.data.map((e)=>{
          let permission: Permission =  Object.assign(new Permission, e);
            let type = permission.slug.split('.')[0];
            switch(type) {
              case 'users':
              case 'roles':
              case 'companies-positions':
                permission.resource = 'administration';
              break;
              case 'expenses':
              case 'types-expenses':
                permission.resource = 'transactions';  
              break; 
              case 'tests':
              case 'studies':
                permission.resource = 'tests';
              break;
              case 'patients':
                permission.resource = 'patients';
              break;
              default:
                permission.resource = 'specials';
              break;
            }
          return permission
        })
        return data;
      })
    )
  }
}
