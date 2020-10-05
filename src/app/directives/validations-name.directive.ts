
import { URL_GLOBAL } from '../config';
import { HttpClient } from '@angular/common/http';
import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[validateUnique]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: ValidationsNameDirective, multi: true }]
})
export class ValidationsNameDirective {
  private url: string;
  constructor(private http: HttpClient) { }
  validateUniqueCompanyPosition(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      this.url = `${URL_GLOBAL}/companies-positions-validate-unique`;
      return this.getValidations(control);
    }
  }

  validateUniqueRole(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      this.url = `${URL_GLOBAL}/roles-validate-unique`;
      return this.getValidations(control);
    }
  }

  validateUniqueHealthCenter(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      this.url = `${URL_GLOBAL}/health-centers-validate-unique`;
      return this.getValidations(control);
    }
  }

  validateUniqueTypeExpense(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      this.url = `${URL_GLOBAL}/types-expenses-validate-unique`;
      return this.getValidations(control);
    }
  }

  validateUniqueStudy(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      this.url = `${URL_GLOBAL}/studies-validate-unique`;
      return this.getValidations(control);
    }
  }

  validateUniqueUnit(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      this.url = `${URL_GLOBAL}/units-validate-unique`;
      return this.getValidations(control);
    }
  }

  validateUniqueTest(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      this.url = `${URL_GLOBAL}/tests-validate-unique`;
      return this.getValidations(control);
    }
  }

  validateUniqueTitle(testId: number): AsyncValidatorFn {
    this.url = `${URL_GLOBAL}/tests-composeds/${testId}/titles-validate-unique`;
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.getValidations(control);
    };
  }

  validateUniqueParameter(titleId: number): AsyncValidatorFn {
    this.url = `${URL_GLOBAL}/tests-composeds-titles/${titleId}/parameters-validate-unique`;
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.getValidations(control);
    }
  }


  private getValidations(control: AbstractControl): Observable<ValidationErrors | null> {
    if (control.pristine) {
      return of(null);
    }
    const params = {
      name: control.value,
      id: control.parent.get('id').value
    }
    return this.http.get(this.url, { params }).pipe(
      map((resp: any) => resp.data ? { validateUnique: resp.data } : null)
    )
  }
}