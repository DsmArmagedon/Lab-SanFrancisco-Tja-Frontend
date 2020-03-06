import { NgModule } from '@angular/core';

import { DashboardsComponent } from './dashboards.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    DashboardRoutingModule,
    TypeaheadModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ DashboardsComponent ]
})
export class DashboardModule { }
