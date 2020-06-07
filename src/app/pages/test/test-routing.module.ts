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
          }
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
          path: 'tests-composeds',
          component: TestsComposedsComponent,
          canActivate: [
            LoginGuard
          ],
          children: [
            {
              path: '',
              redirectTo: 'store'
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
          }
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule {}
