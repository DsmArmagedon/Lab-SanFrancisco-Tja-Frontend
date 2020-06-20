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
  objectListPermissions: any = [
    {
      resource: 'administration',
      permissions: []
    },
    {
      resource: 'transaction',
      permissions: []
    },
    {
      resource: 'test',
      permissions: []
    },
    {
      resource: 'patient',
      permissions: []
    },
    {
      resource: 'special',
      permissions: []
    }
  ]
  index: number;

  constructor(private http: HttpClient) { }

  listPermissions(): Observable<Permission[]> {
    let url = `${URL_GLOBAL}/permissions`;
    this.objectListPermissions.map(obj => {
      obj.permissions = [];
    });
    const params: Params = {
      permission_select: 'name,description,slug',
      permission_status: 1,
      paginate: 'disabled'
    }
    return this.http.get<Permission[]>(url, { params }).pipe(
      map((resp: any) => {
        let permissionsApp: [] = this.filterPermissions(resp.data);
        this.addIndexPermissionAndChangeToList(permissionsApp);
        return this.objectListPermissions;
      })
    )

  }
  filterPermissions(data: Array<any>): any {
    let unusedPermissions = ['companies-positions.show', 'types-expenses.show', 'studies.show', 'types-expenses.show', 'health-centers.show'];
    return data.filter(permission => {
      return unusedPermissions.includes(permission.slug) ? false : true;
    });
  }
  addIndexPermissionAndChangeToList(data: Array<any>) {
    this.index = 0;
    data.map((permission) => {
      let objPermission: Permission = this.addIndexToConvertObject(permission);
      let type: string = objPermission.slug.split('.')[0];
      switch (type) {
        case 'users':
        case 'roles':
        case 'companies-positions':
        case 'health-centers':
          this.objectListPermissions[0].permissions.push(objPermission);
          break;
        case 'expenses':
        case 'types-expenses':
          this.objectListPermissions[1].permissions.push(objPermission);
          break;
        case 'tests':
        case 'studies':
          this.objectListPermissions[2].permissions.push(objPermission);
          break;
        case 'patients':
          this.objectListPermissions[3].permissions.push(objPermission);
          break;
        default:
          this.objectListPermissions[4].permissions.push(objPermission);
          break;
      }
    });

  }

  addIndexToConvertObject(permission: any): Permission {
    let obj: Permission = Object.assign(new Permission, permission);
    obj.index = this.index;
    this.index++;
    return obj;
  }
  // listPermissions(): Observable<Permission[]> {
  //   let url = `${URL_GLOBAL}/permissions`;
  //   const params: Params = {
  //     permission_select: 'name,description,slug',
  //     permission_status: 1,
  //     paginate: 'disabled'
  //   }
  //   return this.http.get<Permission[]>(url, { params }).pipe(
  //     map((resp: any) => {
  //       let data = resp.data.map((e) => {
  //         let permission: Permission = Object.assign(new Permission, e);
  //         let type = permission.slug.split('.')[0];
  //         switch (type) {
  //           case 'users':
  //           case 'roles':
  //           case 'companies-positions':
  //             permission.resource = 'administration';
  //             break;
  //           case 'expenses':
  //           case 'types-expenses':
  //             permission.resource = 'transactions';
  //             break;
  //           case 'tests':
  //           case 'studies':
  //             permission.resource = 'tests';
  //             break;
  //           case 'patients':
  //             permission.resource = 'patients';
  //             break;
  //           default:
  //             permission.resource = 'specials';
  //             break;
  //         }
  //         return permission
  //       })
  //       return data;
  //     })
  //   )
  // }
}
