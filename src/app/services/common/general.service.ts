import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  validation(formControl: AbstractControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched); 
  }
}
