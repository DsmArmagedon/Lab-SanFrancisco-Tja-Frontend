import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* COMPONENTS */
import { ExpensesComponent } from './expenses/expenses.component';
import { TypesExpensesComponent } from './types-expenses/types-expenses.component';
import { LoginGuard } from 'src/app/guards/login.guard';
import { ExpensesIndexComponent } from './expenses/expenses-index/expenses-index.component';
import { ExpensesStoreUpdateComponent } from './expenses/expenses-store-update/expenses-store-update.component';
import { UPDATE, STORE } from 'src/app/global-variables';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Gastos'
    },
    children: [
        {
            path: '',
            redirectTo: 'expenses'
        },
        {
            path: 'expenses',
            component: ExpensesComponent,
            canActivate: [
              LoginGuard
            ],
            children: [
              {
                path: '',
                redirectTo: 'store'
              },
              {
                path: 'index',
                component: ExpensesIndexComponent,
                canActivate: [
                  LoginGuard
                ]
              },
              {
                path: 'store',
                component: ExpensesStoreUpdateComponent,
                canActivate: [
                  LoginGuard
                ],
                data: {
                  title: 'Crear Gasto',
                  type: STORE,
                  btnStoreUpdate: 'Guardar',
                }
              },
              {
                path: 'update/:code',
                component: ExpensesStoreUpdateComponent,
                canActivate: [
                  LoginGuard
                ],
                data: {
                  title: 'Actualizar Gasto',
                  type: UPDATE,
                  btnStoreUpdate: 'Actualizar',
                  txtLoad: 'Cargando Gasto'
                }
              }
            ]
        },
        {
            path: 'types-expenses',
            component: TypesExpensesComponent,
            canActivate: [
              LoginGuard
            ],
            data: {
                title: 'Tipo de Gasto'
            }
        },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule {}
