import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LoginService,
  AuthenticationService,
  UserService
 } from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    AuthenticationService,
    UserService
  ],
  declarations: []
})
export class ServiceModule { }