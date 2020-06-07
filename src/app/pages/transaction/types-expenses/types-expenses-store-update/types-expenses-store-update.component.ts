import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TypeExpense } from 'src/app/models/type-expense.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TypeExpenseService } from '../../../../services/type-expense/type-expense.service';
import { ValidatorsPattern } from '../../../../validators/validators-pattern';
import { ValidationsNameDirective } from 'src/app/directives/validations-name.directive';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-types-expenses-store-update',
  templateUrl: './types-expenses-store-update.component.html',
  styles: [],
  providers: [ ValidationsNameDirective ]
})
export class TypesExpensesStoreUpdateComponent implements OnInit {
  @Output() executeIndex: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectRowIndexNull: EventEmitter<any> = new EventEmitter<any>();
  formTypeExpense: FormGroup;
  typeExpense: TypeExpense;
  txtLoad: string;
  loadPage: boolean = true;
  loadPageStoreUpdate: boolean = true;
  stateStore: any = {
    title: 'Crear Tipo de Gasto',
    btnStoreUpdate: 'Guardar'
  };

  stateUpdate: any = {
    title: 'Editar Tipo de Gasto',
    btnStoreUpdate: 'Actualizar'
  }
  initialState: any;
  constructor(private typeExpenseService: TypeExpenseService,
              private validationsDirective: ValidationsNameDirective,
              private toastr: ToastrService) {
    this.initialState = this.stateStore;
  }

  ngOnInit() {
    this.formTypeExpense = this.formGroupTypeExpense();
    this.typeExpenseService.updateTypeExpenseObservable.subscribe(
      resp => {
        this.typeExpense = resp;
        this.initialState = this.stateUpdate;
        this.assignValuesFormTypeExpense();
      }
    );
  }

  assignValuesFormTypeExpense(): void {
    this.id.setValue(this.typeExpense.id);
    this.name.setValue(this.typeExpense.name);
    this.description.setValue(this.typeExpense.description);
    this.status.setValue(this.typeExpense.status);
  }

  formGroupTypeExpense(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', {
        validators: [ Validators.required, Validators.maxLength(100), ValidatorsPattern.alphaNumericSpacePattern ],
        asyncValidators: [ this.validationsDirective.validateUniqueTypeExpense.bind(this.validationsDirective) ],
      }),
      description: new FormControl('', [ Validators.maxLength(180) ]),
      status: new FormControl(1)
    });
  }

  get id() { return this.formTypeExpense.get('id'); }
  get name() { return this.formTypeExpense.get('name'); }
  get description() { return this.formTypeExpense.get('description') }
  get status() { return this.formTypeExpense.get('status'); }

  saveFormTypeExpense(): void {
    if(this.formTypeExpense.valid) {
      this.loadPageStoreUpdate = false;
      if(!this.id.value) {
        this.storeForm();
      } else {
        this.updateForm();
      }
    }
  }
  
  storeForm(): void {
    this.txtLoad = 'Guardando Tipo de Gasto';
    this.typeExpenseService.storeTypeExpenses(this.formTypeExpense.value).subscribe(
      resp => {
        this.toastr.success(resp.name.toUpperCase(), 'TIPO DE GASTO Creado Correctamente');
        this.executeIndex.emit();
        this.resetFormTypeExpense();
      },
      () => 
        this.toastr.error('Consulte con el Administrador.', 'Error al crear: TIPO DE GASTO.')
    ).add(
      () => this.loadPageStoreUpdate = true
    );
  }

  updateForm(): void {
    this.txtLoad = 'Actualizando Tipo de Gasto';
    this.typeExpenseService.updateTypeExpenses(this.formTypeExpense.value).subscribe(
      resp => {
        this.toastr.success(resp.name.toUpperCase(), 'TIPO DE GASTO Actualizado Correctamente');
        this.executeIndex.emit();
        this.selectRowIndexNull.emit();
        this.resetFormTypeExpense();
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: TIPO DE GASTO.'),
    ).add(
      () => this.loadPageStoreUpdate = true
    );
  }

  validation(formControl: FormControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  resetFormTypeExpense(): void {
    this.formTypeExpense.reset();
    this.status.setValue(1);
  }

  getStore(): void {
  }
}
