import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private initialState: any;

    /**
   * Activar y desactivar el boton de editar
   */
  private disabledUpdateSubject = new Subject<boolean>();
  public disabledUpdateObservable = this.disabledUpdateSubject.asObservable();
  
  private selectBtnActiveSubject = new Subject<string>();
  public selectBtnActiveObservable = this.selectBtnActiveSubject.asObservable();

  
  constructor() {
   }

   /**
   * Observable para activar y desactivar el boton editar
   * @param disabled 
   */
  changeDisabled(disabled: boolean) {
    this.disabledUpdateSubject.next(disabled);
  }

  changeSelectBtn(text: string) {
    this.selectBtnActiveSubject.next(text);
  }

  validation(formControl: AbstractControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched); 
  }

  getDataInitialState(route: ActivatedRoute): any {
    route.data.subscribe(
      resp => this.initialState = resp
    );
    return this.initialState;
  }
}
