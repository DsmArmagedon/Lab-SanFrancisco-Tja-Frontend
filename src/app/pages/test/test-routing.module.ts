import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

/* COMPONENTS */
import { StudiesComponent } from './studies/studies.component';
import { TestsSimplesComponent } from './tests-simples/tests-simples.component';
import { TestsComposedsComponent } from './tests-composeds/tests-composeds.component';
import { UnitsComponent } from './units/units.component';
import { LoginGuard } from '../../guards/login.guard';
import { TestsComposedsStoreUpdateComponent } from './tests-composeds/tests-composeds-store-update/tests-composeds-store-update.component';
import { TestsComposedsIndexComponent } from './tests-composeds/tests-composeds-index/tests-composeds-index.component';
import { STORE, UPDATE } from 'src/app/global-variables';
import { TestsComposedsShowComponent } from './tests-composeds/tests-composeds-show/tests-composeds-show.component';
import { StudiesIndexComponent } from './studies/studies-index/studies-index.component';
import { StudiesStoreUpdateComponent } from './studies/studies-store-update/studies-store-update.component';
import { UnitsIndexComponent } from './units/units-index/units-index.component';
import { UnitsStoreUpdateComponent } from './units/units-store-update/units-store-update.component';

/* COMPONENTS */

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Estudios'
    },
    children: [
      {
        path: '',
        redirectTo: 'studies'
      },
      {
        path: 'studies',
        component: StudiesComponent,
        canActivate: [
          LoginGuard
        ],
        data: {
          title: 'Estudios'
        },
        children: [
          {
            path: '',
            redirectTo: 'index'
          },
          {
            path: 'index',
            component: StudiesIndexComponent,
            canActivate: [
              LoginGuard
            ]
          },
          {
            path: 'store',
            component: StudiesStoreUpdateComponent,
            canActivate: [
              LoginGuard
            ],
            data: {
              title: 'Crear Estudio',
              type: STORE,
              btnStoreUpdate: 'Guardar'
            }
          },
          {
            path: 'update/:id',
            component: StudiesStoreUpdateComponent,
            canActivate: [
              LoginGuard
            ],
            data: {
              title: 'Actualizar Estudio',
              type: UPDATE,
              btnStoreUpdate: 'Actualizar',
              txtLoad: 'Cargando Estudio'
            }
          }
        ]
      },
      {
        path: 'tests-simples',
        component: TestsSimplesComponent,
        canActivate: [
          LoginGuard
        ],
        data: {
          title: 'Pruebas Simples'
        }
      },
      {
        path: 'tests-composed',
        component: TestsComposedsComponent,
        canActivate: [
          LoginGuard
        ],
        children: [
          {
            path: '',
            redirectTo: 'index'
          },
          {
            path: 'store',
            component: TestsComposedsStoreUpdateComponent,
            canActivate: [
              LoginGuard
            ],
            data: {
              title: 'Crear Prueba',
              type: STORE,
              btnStoreUpdate: 'Guardar'
            }
          },
          {
            path: 'update/:id',
            component: TestsComposedsStoreUpdateComponent,
            canActivate: [
              LoginGuard
            ],
            data: {
              title: 'Actualizar Prueba',
              type: UPDATE,
              btnStoreUpdate: 'Actualizar'
            }
          },
          {
            path: 'show/:id',
            component: TestsComposedsShowComponent,
            canActivate: [
              LoginGuard
            ],
            data: {
              title: 'Ver Prueba'
            }
          },
          {
            path: 'index',
            component: TestsComposedsIndexComponent,
            canActivate: [
              LoginGuard
            ]
          }
        ]
      },
      {
        path: 'units',
        component: UnitsComponent,
        canActivate: [
          LoginGuard
        ],
        data: {
          title: 'Unidades'
        },
        children: [
          {
            path: '',
            redirectTo: 'index'
          },
          {
            path: 'index',
            component: UnitsIndexComponent,
            canActivate: [
              LoginGuard
            ]
          },
          {
            path: 'store',
            component: UnitsStoreUpdateComponent,
            canActivate: [
              LoginGuard
            ],
            data: {
              title: 'Crear Unidad de Medida',
              type: STORE,
              btnStoreUpdate: 'Guardar'
            }
          },
          {
            path: 'update/:id',
            component: UnitsStoreUpdateComponent,
            canActivate: [
              LoginGuard
            ],
            data: {
              title: 'Actualizar Unidad de Medida',
              type: UPDATE,
              btnStoreUpdate: 'Actualizar',
              txtLoad: 'Cargando Unidad de Medida'
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
