import { URL_GLOBAL } from '../config';
import { HttpClient } from '@angular/common/http';
import { Directive } from '@angular/core';
import {  AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[validateUnique]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: ValidationsUserDirective, multi: true }]
})
export class ValidationsUserDirective {
  url: string  = `${URL_GLOBAL}/users-validate-unique`;
  constructor(private http: HttpClient) { }
  validateUsername(control: AbstractControl): Observable<ValidationErrors | null> {
    const params = {
      username: control.value,
      id: control.parent.get('id').value
    }
    return this.getValidations(control, params);
  }

  validateCi(control: AbstractControl): Observable<ValidationErrors | null> {
    const params = {
      ci: control.value,
      id: control.parent.get('id').value
    }
    return this.getValidations(control, params);
  }
  validateEmail(control: AbstractControl): Observable<ValidationErrors | null> {
    const params = {
      email: control.value,
      id: control.parent.get('id').value
    }
    return this.getValidations(control, params);
  }

  getValidations(control: AbstractControl, params: any): Observable<any> | null{
    if(control.pristine) {
      return of(null);
    }
    return this.http.get(this.url, { params }).pipe(
      map( ( resp: any ) => {
        if(resp.data) {
          return { validateUnique: resp.data } ;
        }
        return resp.data;
      })
    )
  }
}
