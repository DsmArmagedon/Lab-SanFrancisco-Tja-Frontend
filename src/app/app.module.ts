import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* FORMS REACTIVE */
import { ReactiveFormsModule } from '@angular/forms';

/* HTTP CLIENT MODULE */
import { HttpClientModule } from '@angular/common/http';

/* COMPONENTS */
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

/* MODULE SHARED */
import { SharedModule } from './shared/shared.module';
import { ServiceModule } from './services/service.module';
import { ValidationsUserDirective } from './directives/validations-user.directive';
import { ToastrModule } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';
import { ValidationsNameDirective } from './directives/validations-name.directive';
import { PatientComponent } from './pages/patient/patient.component';

import { registerLocaleData } from '@angular/common';
import  localeEs  from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';

registerLocaleData(localeEs, 'es', localeEsExtra);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    ValidationsUserDirective,
    ValidationsNameDirective,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(
      {
        timeOut: 15000,
        positionClass: 'toast-top-right',
        closeButton: true,
        tapToDismiss: true
      }),
    ServiceModule
  ],
  providers: [
    TitleCasePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
