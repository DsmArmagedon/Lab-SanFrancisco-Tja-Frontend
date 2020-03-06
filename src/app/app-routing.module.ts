import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* COMPONENTES */
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SharedComponent } from './shared/shared.component';
import { LoginGuard } from './guards/login.guard';
import { PatientComponent } from './pages/patient/patient.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: SharedComponent,
    canActivate: [
      LoginGuard
    ],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'administration',
        loadChildren: () => import('./pages/administration/administration.module').then(m => m.AdministrationModule)
      },
      {
        path: 'transaction',
        loadChildren: () => import('./pages/transaction/transaction.module').then(m => m.TransactionModule)
      },
      {
        path: 'test',
        loadChildren: () => import('./pages/test/test.module').then(m => m.TestModule)
      },
      {
        path: 'patient',
        component: PatientComponent
      }
    ]
  },
  {
    path: '**',
    component:  PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
