import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TypeExpense } from 'src/app/models/type-expense.model';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { TypeExpenseService } from '../../../../services/type-expense/type-expense.service';
import { ValidatorsPattern } from '../../../../validators/validators-pattern';
import { ValidationsNameDirective } from 'src/app/directives/validations-name.directive';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/services/common/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { STORE, UPDATE } from 'src/app/global-variables';

@Component({
  selector: 'app-types-expenses-store-update',
  templateUrl: './types-expenses-store-update.component.html',
  styles: [],
  providers: [ValidationsNameDirective]
})
export class TypesExpensesStoreUpdateComponent implements OnInit {
  formTypeExpense: FormGroup;
  typeExpense: TypeExpense;
  txtLoad: string;
  loadPage: boolean = true;
  initialState: any;
  idTypeExpense: number;

  constructor(private typeExpenseService: TypeExpenseService,
    private validationsDirective: ValidationsNameDirective,
    private toastr: ToastrService,
    public gralService: GeneralService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.formTypeExpense = this.formGroupTypeExpense();
    this.initialState = this.gralService.getDataInitialState(this.route);
    this.selectTypeFormStoreOrUpdate();
  }

  get id() { return this.formTypeExpense.get('id'); }
  get name() { return this.formTypeExpense.get('name'); }
  get description() { return this.formTypeExpense.get('description') }
  get status() { return this.formTypeExpense.get('status'); }

  formGroupTypeExpense(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100), ValidatorsPattern.alphaNumericSpacePattern],
        asyncValidators: [this.validationsDirective.validateUniqueTypeExpense.bind(this.validationsDirective)],
      }),
      description: new FormControl('', [Validators.maxLength(255)]),
      status: new FormControl(1)
    });
  }

  assignValuesFormTypeExpense(): void {
    this.id.setValue(this.typeExpense.id);
    this.name.setValue(this.typeExpense.name);
    this.description.setValue(this.typeExpense.description);
    this.status.setValue(this.typeExpense.status);
  }

  getUpdate(): void {
    this.txtLoad = this.initialState.txtLoad;
    this.getIdToParameterFromUrl();
    this.loadPage = false;
    this.typeExpenseService.editShowTypeExpenses(this.idTypeExpense).subscribe(
      resp => {
        this.typeExpense = resp;
        this.assignValuesFormTypeExpense();
      },
      () => {
        this.toastr.error('Consulte con el Administrador', 'Error al mostrar el formulario para Actualizar el CARGO');
        this.router.navigate(['transaction/types-expenses/index']);
      }
    ).add(
      () => this.loadPage = true
    );
  }

  saveFormTypeExpense(): void {
    if (this.formTypeExpense.valid) {
      this.loadPage = false;
      if (!this.id.value) {
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
        this.resetFormTypeExpense();
      },
      () =>
        this.toastr.error('Consulte con el Administrador.', 'Error al crear: TIPO DE GASTO.')
    ).add(
      () => this.loadPage = true
    );
  }

  updateForm(): void {
    this.txtLoad = 'Actualizando Tipo de Gasto';
    this.typeExpenseService.updateTypeExpenses(this.formTypeExpense.value).subscribe(
      resp => {
        this.toastr.success(resp.name.toUpperCase(), 'TIPO DE GASTO Actualizado Correctamente');
        this.router.navigate(['transaction/types-expenses/index']);
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: TIPO DE GASTO.'),
    ).add(
      () => this.loadPage = true
    );
  }

  selectTypeFormStoreOrUpdate(): void {
    switch (this.initialState.type) {
      case STORE:
        this.gralService.changeSelectBtn(STORE);
        break;
      case UPDATE:
        this.gralService.changeDisabled(false);
        this.gralService.changeSelectBtn(UPDATE);
        this.getUpdate();
        break;
    }
  }

  getIdToParameterFromUrl(): void {
    this.route.paramMap.subscribe(
      params => this.idTypeExpense = parseInt(params.get('id'))
    );

  }

  resetFormTypeExpense(): void {
    this.formTypeExpense.reset();
    this.status.setValue(1);
  }

  ngOnDestroy() {
    if (this.initialState.type == UPDATE) {
      this.gralService.changeDisabled(true);
    }
  }
}
