import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* FORMS */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* ROUTING MODULE */
import { TestRoutingModule } from './test-routing.module';

/* MODULES CUSTOM */
import { LoadModule } from 'src/app/components/load/load/load.module';
import { LoadInputModule } from '../../components/load/load-input/load-input.module';

/* COMPONENTS STUDIES*/
import { StudiesComponent } from './studies/studies.component';
import { StudiesFilterComponent } from './studies/studies-filter/studies-filter.component';
import { StudiesStoreUpdateComponent } from './studies/studies-store-update/studies-store-update.component';
import { StudiesIndexComponent } from './studies/studies-index/studies-index.component';

/* COMPONENTS */
import { TestsSimplesComponent } from './tests-simples/tests-simples.component';
import { TestsComposedsComponent } from './tests-composeds/tests-composeds.component';

/* COMPONENTS UNITS */
import { UnitsComponent } from './units/units.component';
import { UnitsIndexComponent } from './units/units-index/units-index.component';
import { UnitsStoreUpdateComponent } from './units/units-store-update/units-store-update.component';
import { UnitsFilterComponent } from './units/units-filter/units-filter.component';

/* COMPONENTS NGX-BOOTSTRAP */
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TagInputModule } from 'ngx-chips';

/* COMPONENTS TEST SIMPLES */
import { TestsSimplesFilterComponent } from './tests-simples/tests-simples-filter/tests-simples-filter.component';
import { TestsSimplesIndexComponent } from './tests-simples/tests-simples-index/tests-simples-index.component';
import { TestsSimplesStoreUpdateComponent } from './tests-simples/tests-simples-store-update/tests-simples-store-update.component';

/* COMPONENTS TEST COMPOSEDS */
import { TestsComposedsStoreUpdateComponent } from './tests-composeds/tests-composeds-store-update/tests-composeds-store-update.component';
import { TestsComposedsShowComponent } from './tests-composeds/tests-composeds-show/tests-composeds-show.component';
import { TitlesIndexComponent } from './tests-composeds/titles-index/titles-index.component';
import { ParametersIndexComponent } from './tests-composeds/parameters-index/parameters-index.component';
import { TestsComposedsIndexComponent } from './tests-composeds/tests-composeds-index/tests-composeds-index.component';
import { TestsComposedsFilterComponent } from './tests-composeds/tests-composeds-filter/tests-composeds-filter.component';
import { ParametersStoreUpdateComponent } from './tests-composeds/parameters-store-update/parameters-store-update.component';
import { TitlesStoreUpdateComponent } from './tests-composeds/titles-store-update/titles-store-update.component';
import { ParametersShowComponent } from './tests-composeds/parameters-show/parameters-show.component';

/* COMPONENTS NORMAL VALUES */
import { NormalValuesComponent } from './normal-values/normal-values.component';

/* INTERCEPTORS */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenErrorInterceptorService } from 'src/app/services/interceptors/token-error-interceptor.service';

/* PIPES */
import { TypeDataPipe } from '../../pipes/type-data.pipe';
@NgModule({
  declarations: [
    StudiesComponent,
    TestsSimplesComponent,
    TestsComposedsComponent,
    UnitsComponent,
    StudiesFilterComponent,
    StudiesStoreUpdateComponent,
    StudiesIndexComponent,
    UnitsIndexComponent,
    UnitsStoreUpdateComponent,
    UnitsFilterComponent,
    TestsSimplesFilterComponent,
    TestsSimplesIndexComponent,
    TestsSimplesStoreUpdateComponent,
    TestsComposedsStoreUpdateComponent,
    TitlesIndexComponent,
    ParametersIndexComponent,
    TestsComposedsIndexComponent,
    TestsComposedsFilterComponent,
    ParametersStoreUpdateComponent,
    TitlesStoreUpdateComponent,
    ParametersShowComponent,
    TypeDataPipe,
    TestsComposedsShowComponent,
    NormalValuesComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoadModule,
    LoadInputModule,
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    NgSelectModule,
    TagInputModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenErrorInterceptorService,
      multi: true
    }
  ]
})
export class TestModule { }
