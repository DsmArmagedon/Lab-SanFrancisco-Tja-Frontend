import { URL_GLOBAL } from '../config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permission } from '../models/permission.model';
import { Params } from '@angular/router';
import { Resource } from '../models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  arrayResourcesDisplay: any = {
    administration: 'Administración',
    transaction: 'Transacción',
    test: 'Pruebas',
    patient: 'Pacientes',
    special: 'Especiales'
  }

  objectListPermissions: any = {
    administration: new Resource,
    transaction: new Resource,
    test: new Resource,
    patient: new Resource,
    special: new Resource
  }

  unusedPermissions: Array<string> = ['companies-positions.show', 'types-expenses.show', 'studies.show', 'types-expenses.show', 'health-centers.show'];
  index: number;

  constructor(private http: HttpClient) {
    this.initializeObjListPermissions();
  }

  listPermissions(): Observable<Permission[]> {
    let url = `${URL_GLOBAL}/permissions`;
    this.initializeObjListPermissions();
    const params: Params = {
      permission_select: 'name,description,slug',
      permission_status: 1,
      paginate: 'disabled'
    }
    return this.http.get<Permission[]>(url, { params }).pipe(
      map((resp: any) => {
        let permissionsApp: Permission[] = this.filterPermissionsToShow(resp.data);
        this.addIndexPermissionAndChangeToList(permissionsApp);
        return this.objectListPermissions;
      })
    )

  }
  filterPermissionsToShow(data: Array<any>): any {
    return data.filter(permission => {
      return this.unusedPermissions.includes(permission.slug) ? false : true;
    });
  }
  addIndexPermissionAndChangeToList(data: Array<any>) {
    this.index = 0;
    data.forEach(permission => {
      let objPermission: Permission = this.addIndexToObjectAssignPermission(permission);
      let type: string = objPermission.slug.split('.')[0];
      this.switchResources(type, objPermission);
    });

  }

  switchResources(type: string, objPermission?: Permission) {
    switch (type) {
      case 'users':
      case 'roles':
      case 'companies-positions':
      case 'health-centers':
        this.objectListPermissions['administration'].total++;
        this.objectListPermissions['administration'].permissions.push(objPermission);
        break;
      case 'expenses':
      case 'types-expenses':
        this.objectListPermissions['transaction'].total++;
        this.objectListPermissions['transaction'].permissions.push(objPermission);
        break;
      case 'tests':
      case 'studies':
        this.objectListPermissions['test'].total++;
        this.objectListPermissions['test'].permissions.push(objPermission);
        break;
      case 'patients':
        this.objectListPermissions['patient'].total++;
        this.objectListPermissions['patient'].permissions.push(objPermission);
        break;
      default:
        this.objectListPermissions['special'].total++;
        this.objectListPermissions['special'].permissions.push(objPermission);
        break;
    }
  }

  addIndexToObjectAssignPermission(permission: any): Permission {
    let obj: Permission = Object.assign(new Permission, permission);
    obj.index = this.index;
    this.index++;
    return obj;
  }

  resetListPermissionsSelect(): void {
    for (const index in this.objectListPermissions) {
      this.objectListPermissions[index].select = 0;
    }
  }

  selectAllListPermissionsSelect(): void {
    for (const index in this.objectListPermissions) {
      this.objectListPermissions[index].select = this.objectListPermissions[index].total;
    }
  }

  initializeObjListPermissions(): void {
    for (const index in this.objectListPermissions) {
      this.objectListPermissions[index].display = this.arrayResourcesDisplay[index];
      this.objectListPermissions[index].total = 0;
      this.objectListPermissions[index].select = 0;
      this.objectListPermissions[index].permissions = [];
    }
  }
}
