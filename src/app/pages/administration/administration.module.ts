import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ROUTING MODULE */
import { AdministrationRoutingModule } from './administration-routing.module';

/* COMPONENTS USERS*/
import { UsersComponent } from './users/users.component';
import { UsersStoreUpdateComponent } from './users/users-store-update/users-store-update.component';
import { UsersShowComponent } from './users/users-show/users-show.component';
import { UsersFilterComponent } from './users/users-filter/users-filter.component';

/* COMPONENTS ROLES */
import { RolesComponent } from './roles/roles.component';
import { RolesIndexComponent } from './roles/roles-index/roles-index.component';
import { RolesStoreUpdateComponent } from './roles/roles-store-update/roles-store-update.component';
import { RolesShowComponent } from './roles/roles-show/roles-show.component';
import { RolesFilterComponent } from './roles/roles-filter/roles-filter.component';

/* COMPONENTS COMPANY POSITIONS */
import { CompaniesPositionsComponent } from './companies-positions/companies-positions.component';
import { CompaniesPositionsIndexComponent } from './companies-positions/companies-positions-index/companies-positions-index.component';
import { CompaniesPositionsFilterComponent } from './companies-positions/companies-positions-filter/companies-positions-filter.component';
import { CompaniesPositionsStoreUpdateComponent } from './companies-positions/companies-positions-store-update/companies-positions-store-update.component';

/* COMPONENTS HEALTH CENTERS */
import { HealthCentersComponent } from './health-centers/health-centers.component';
import { HealthCentersStoreUpdateComponent } from './health-centers/health-centers-store-update/health-centers-store-update.component';
import { HealthCentersIndexComponent } from './health-centers/health-centers-index/health-centers-index.component';
import { HealthCentersFilterComponent } from './health-centers/health-centers-filter/health-centers-filter.component';

/* FORMS */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


/* INTERCEPTORS */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenErrorInterceptorService } from 'src/app/services/interceptors/token-error-interceptor.service';

/* COMPONENTS NGX-BOOTSTRAP */
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoadModule } from 'src/app/components/load/load/load.module';
import { LoadInputModule } from '../../components/load/load-input/load-input.module';

@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    CompaniesPositionsComponent,
    UsersStoreUpdateComponent,
    UsersFilterComponent,
    UsersShowComponent,
    RolesIndexComponent,
    RolesStoreUpdateComponent,
    RolesShowComponent,
    RolesFilterComponent,
    CompaniesPositionsIndexComponent,
    CompaniesPositionsFilterComponent,
    CompaniesPositionsStoreUpdateComponent,
    HealthCentersComponent,
    HealthCentersStoreUpdateComponent,
    HealthCentersIndexComponent,
    HealthCentersFilterComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    ButtonsModule.forRoot(),
    AccordionModule.forRoot(),
    NgSelectModule,
    LoadModule,
    LoadInputModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenErrorInterceptorService,
      multi: true
    }
  ],
  entryComponents: [
    UsersStoreUpdateComponent,
    UsersShowComponent,
    RolesShowComponent,
    RolesStoreUpdateComponent,
    CompaniesPositionsStoreUpdateComponent,
    HealthCentersStoreUpdateComponent
  ]
})
export class AdministrationModule { }
