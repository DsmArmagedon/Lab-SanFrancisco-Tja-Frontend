import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import { TypeaheadMatch, TypeaheadConfig } from 'ngx-bootstrap/typeahead';
import { Observable, Observer, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { PatientService } from 'src/app/services/patient.service';
export function getTypeaheadConfig(): TypeaheadConfig {
  return Object.assign(new TypeaheadConfig(), { cancelRequestOnFocusLost: true });
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboards.component.html',
  providers: [{ provide: TypeaheadConfig, useFactory: getTypeaheadConfig }]
})
export class DashboardsComponent implements OnInit {

  formPrueba: FormGroup;
  formPatients: FormGroup;
  optionOnBlur: any;
  noResult = false;
  showState: string = '';
  patients: Observable<any[]> = new Observable<any[]>();
  typeaheadLoading: boolean;

  constructor(public gralService: GeneralService,
    private patientService: PatientService) {
  }


  states: any = [
    {
      id: 1,
      name: 'tarija'
    },
    {
      id: 2,
      name: 'potosi'
    },
    {
      id: 3,
      name: 'chuquisaca'
    },
    {
      id: 4,
      name: 'santa cruz'
    },
    {
      id: 5,
      name: 'beni'
    },
    {
      id: 6,
      name: 'pando'
    }
  ]

  ngOnInit() {
    this.formPrueba = this.formGroupPrueba();
    this.showState = 'chuquisaca';
    this.state.setValue(3);

    /////////////////////

    this.formPatients = this.formGroupPatient();
    // NOTA IMPORTANTE:  ERROR TypeError: Cannot read property 'length' of undefined at TypeaheadDirective.onBlur
    // se debe a que se utiliza dos plugins ng-select y ngx-bootstrap solucionar aumentando: %% this._matches al archivo ./node_modules/ngx-bootstrap/__ivy_ngcc__/typeahead/fesm2015/ngx-bootstrap-typeahead.js
    // if (!this.container && this._matches && this._matches.length === 0) {
    //   this.typeaheadOnBlur.emit(new TypeaheadMatch(this.element.nativeElement.value, this.element.nativeElement.value, false));
    // }
    this.patients = new Observable((observer: Observer<string>) => {
      observer.next(this.showPatient);
    }).pipe(
      switchMap((query: string) => {
        return this.patientService.indexPatients(query).pipe(
          catchError(() => of([]))
        );
      })
    );

    this.showPatient = 'Nerea';
    this.patient.setValue('2671796');
  }
  formGroupPrueba() {
    return new FormGroup({
      username: new FormControl(''),
      state: new FormControl('', Validators.required)
    })
  }
  get username() { return this.formPrueba.get('username'); }
  get state() { return this.formPrueba.get('state'); }
  saveFormPrueba(): void {
    console.log(this.state.value);
  }
  onSelect(event: TypeaheadMatch): void {
    this.state.setValue(event.item.id);
    this.showState = event.item.name;
  }
  typeaheadOnBlur(event: any): void {
    const value = this.states.find(state => state.name.toLowerCase() === this.showState.toLowerCase());
    if (!value) {
      this.state.setValue(null);
    };
  }

  showPatient: string;

  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  formGroupPatient() {
    return new FormGroup({
      patient: new FormControl('', Validators.required)
    })
  }
  get patient() { return this.formPatients.get('patient'); }
  saveFormPatients() {
    console.log(this.patient.value);
  }

  typeaheadOnBlurPatient(event: TypeaheadMatch) {
    this.patients.subscribe(resp => {

      const value = resp.find(patient => patient.first_name.toLowerCase() === this.showPatient.toLowerCase());
      console.log(value);
      if (!value) {
        this.patient.setValue(null);
        this.showPatient = null;
      } else {
        this.patient.setValue(value.ci);
        this.showPatient = value.first_name;
      }
    })
  }

  onSelectPatient(event: TypeaheadMatch) {
    this.patient.setValue(event.item.ci);
    this.showPatient = event.item.first_name;
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
}
