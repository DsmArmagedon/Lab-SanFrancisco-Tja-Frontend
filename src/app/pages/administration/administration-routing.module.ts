import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* COMPONENTS */
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { CompaniesPositionsComponent } from './companies-positions/companies-positions.component';
import { LoginGuard } from 'src/app/guards/login.guard';
import { HealthCentersComponent } from './health-centers/health-centers.component';
import { RolesIndexComponent } from './roles/roles-index/roles-index.component';
import { RolesStoreUpdateComponent } from './roles/roles-store-update/roles-store-update.component';
import { STORE, UPDATE } from 'src/app/global-variables';
import { UsersIndexComponent } from './users/users-index/users-index.component';
import { UsersStoreUpdateComponent } from './users/users-store-update/users-store-update.component';
import { CompaniesPositionsIndexComponent } from './companies-positions/companies-positions-index/companies-positions-index.component';
import { CompaniesPositionsStoreUpdateComponent } from './companies-positions/companies-positions-store-update/companies-positions-store-update.component';
import { HealthCentersIndexComponent } from './health-centers/health-centers-index/health-centers-index.component';
import { HealthCentersStoreUpdateComponent } from './health-centers/health-centers-store-update/health-centers-store-update.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Administración'
    },
    children: [
      {
        path: '',
        redirectTo: 'users'
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [
          LoginGuard
        ],
        data: {
          title: 'Usuarios'
        },
        children: [
          {
            path: '',
            redirectTo: 'index'
          },
          {
            path: 'index',
            component: UsersIndexComponent,
            canActivate: [
              LoginGuard
            ]
          },
          {
            path: 'store',
            component: UsersStoreUpdateComponent,
            canActivate: [
              LoginGuard
            ],
            data: {
              title: 'Crear Usuario',
              type: STORE,
              btnStoreUpdate: 'Guardar'
            }
          },
          {
            path: 'update/:ci',
            component: UsersStoreUpdateComponent,
            canActivate: [
              LoginGuard
            ],
            data: {
              title: 'Actualizar Usuario',
              type: UPDATE,
              btnStoreUpdate: 'Actualizar',
              txtLoad: 'Cargando Usuario'
            }
          }
        ]
      },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [
          LoginGuard
        ],
        data: {
          title: 'Roles'
        },
        children: [
          {
            path: '',
            redirectTo: 'index'
          },
          {
            path: 'index',
            component: RolesIndexComponent,
            canActivate: [
              LoginGuard
            ]
          },
          {
            path: 'store',
            component: RolesStoreUpdateComponent,
            canActivate: [
              LoginGuard
            ],
            data: {
              title: 'Crear Rol',
              type: STORE,
              btnStoreUpdate: 'Guardar',
              txtLoad: 'Cargando Permisos'
            }
          },
          {
            path: 'update/:id',
            component: RolesStoreUpdateComponent,
            canActivate: [
              LoginGuard
            ],
            data: {
              title: 'Actualizar Rol',
              type: UPDATE,
              btnStoreUpdate: 'Actualizar',
              txtLoad: 'Cargando Rol'
            }
          }
        ]
      },
      {
        path: 'companies-positions',
        component: CompaniesPositionsComponent,
        canActivate: [
          LoginGuard
        ],
        data: {
          title: 'Cargos'
        },
        children: [
          {
            path: '',
            redirectTo: 'index'
          },
          {
            path: 'index',
            component: CompaniesPositionsIndexComponent,
            canActivate: [
              LoginGuard
            ]
          },
          {
            path: 'store',
            component: CompaniesPositionsStoreUpdateComponent,
            canActivate: [
              LoginGuard
            ],
            data: {
              title: 'Crear Cargo',
              type: STORE,
              btnStoreUpdate: 'Guardar'
            }
          },
          {
            path: 'update/:id',
            component: CompaniesPositionsStoreUpdateComponent,
            canActivate: [
              LoginGuard
            ],
            data: {
              title: 'Actualizar Cargo',
              type: UPDATE,
              btnStoreUpdate: 'Actualizar',
              txtLoad: 'Cargando Cargo'
            }
          }
        ]
      },
      {
        path: 'health-centers',
        component: HealthCentersComponent,
        canActivate: [
          LoginGuard
        ],
        data: {
          title: 'Centros de Salud'
        },
        children: [
          {
            path: '',
            redirectTo: 'index'
          },
          {
            path: 'index',
            component: HealthCentersIndexComponent,
            canActivate: [
              LoginGuard
            ]
          },
          {
            path: 'store',
            component: HealthCentersStoreUpdateComponent,
            canActivate: [
              LoginGuard
            ],
            data: {
              title: 'Crear Centro de Salud',
              type: STORE,
              btnStoreUpdate: 'Guardar'
            }
          },
          {
            path: 'update/:id',
            component: HealthCentersStoreUpdateComponent,
            canActivate: [
              LoginGuard
            ],
            data: {
              title: 'Actualizar Centro de Salud',
              type: UPDATE,
              btnStoreUpdate: 'Actualizar',
              txtLoad: 'Cargando Centro de Salud'
            }
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
