import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsComponent } from './dashboards.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    DashboardRoutingModule,
    TypeaheadModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [DashboardsComponent]
})
export class DashboardModule { }
