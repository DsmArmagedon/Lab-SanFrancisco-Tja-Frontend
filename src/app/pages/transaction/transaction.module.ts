import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* FORMS */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* ROUTING MODULE */
import { TransactionRoutingModule } from './transaction-routing.module';

/* MODULES CUSTOM */
import { LoadModule } from 'src/app/components/load/load/load.module';
import { LoadInputModule } from '../../components/load/load-input/load-input.module';

/* COMPONENTS TYPE EXPENSES */
import { TypesExpensesComponent } from './types-expenses/types-expenses.component';
import { TypesExpensesIndexComponent } from './types-expenses/types-expenses-index/types-expenses-index.component';
import { TypesExpensesFilterComponent } from './types-expenses/types-expenses-filter/types-expenses-filter.component';
import { TypesExpensesStoreUpdateComponent } from './types-expenses/types-expenses-store-update/types-expenses-store-update.component';

/* COMPONENTS EXPENSES */
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpensesIndexComponent } from './expenses/expenses-index/expenses-index.component';
import { ExpensesFilterComponent } from './expenses/expenses-filter/expenses-filter.component';
import { ExpensesShowComponent } from './expenses/expenses-show/expenses-show.component';
import { ExpensesStoreUpdateComponent } from './expenses/expenses-store-update/expenses-store-update.component';

/* COMPONENTS NGX-BOOTSTRAP */
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    ExpensesComponent,
    TypesExpensesComponent,
    TypesExpensesIndexComponent,
    TypesExpensesFilterComponent,
    TypesExpensesStoreUpdateComponent,
    ExpensesIndexComponent,
    ExpensesFilterComponent,
    ExpensesShowComponent,
    ExpensesStoreUpdateComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoadModule,
    LoadInputModule,
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgSelectModule
  ]
})
export class TransactionModule { }
