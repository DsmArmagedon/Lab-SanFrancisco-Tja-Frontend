import { URL_GLOBAL } from '../config';
import { HttpClient } from '@angular/common/http';
import { Directive } from '@angular/core';
import {  AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[validateUnique]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: ValidationsNameDirective, multi: true }]
})
export class ValidationsNameDirective {
  url: string;
  constructor(private http: HttpClient) { }
  validateUniqueCompanyPosition(control: AbstractControl): Observable<ValidationErrors | null> {
    this.url  = `${URL_GLOBAL}/companies-positions-validate-unique`;
    
    return this.getValidations(control);
  }

  validateUniqueRole(control: AbstractControl): Observable<ValidationErrors | null> {
    this.url  = `${URL_GLOBAL}/roles-validate-unique`;
    
    return this.getValidations(control);
  }

  validateUniqueHealthCenter(control: AbstractControl): Observable<ValidationErrors | null> {
    this.url = `${URL_GLOBAL}/health-centers-validate-unique`;

    return this.getValidations(control);
  }

  validateUniqueTypeExpense(control: AbstractControl): Observable<ValidationErrors | null > {
    this.url = `${URL_GLOBAL}/types-expenses-validate-unique`;
    return this.getValidations(control);
  }

  validateUniqueStudy(control: AbstractControl): Observable<ValidationErrors | null > {
    this.url = `${URL_GLOBAL}/studies-validate-unique`;
    return this.getValidations(control);
  }

  validateUniqueUnit(control: AbstractControl): Observable<ValidationErrors | null > {
    this.url = `${URL_GLOBAL}/units-validate-unique`;
    return this.getValidations(control);
  }

  validateUniqueTest(control: AbstractControl): Observable<ValidationErrors | null > {
    this.url = `${URL_GLOBAL}/tests-validate-unique`;
    return this.getValidations(control);
  }

  getValidations(control: AbstractControl): Observable<any> | null{
    if(control.pristine) {
      return of(null);
    }
    const params = {
      name: control.value,
      id: control.parent.get('id').value
    }
    return this.http.get(this.url, { params }).pipe(
      map( ( resp: any ) => {
        if(resp.data) {
          return { validateUnique: resp.data } ;
        }
        return resp.data;
      }),
    )
  }
}