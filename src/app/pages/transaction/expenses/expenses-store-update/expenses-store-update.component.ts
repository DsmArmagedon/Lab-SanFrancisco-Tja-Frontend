import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { esLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';
import { Expense } from 'src/app/models/expense.model';
import { TypeExpense } from 'src/app/models/type-expense.model';
import { DOCUMENTS, STORE, UPDATE } from '../../../../global-variables';
import { ExpenseService } from '../../../../services/expense/expense.service';
import { FunctionService } from '../../../../services/function/function.service';
import { TypeExpenseService } from '../../../../services/type-expense/type-expense.service';
import { ValidatorsGlobal } from '../../../../validators/validators-global';
import { ActivatedRoute, Router } from '@angular/router';
defineLocale('es', esLocale);
@Component({
  selector: 'app-expenses-store-update',
  templateUrl: './expenses-store-update.component.html',
  styles: []
})
export class ExpensesStoreUpdateComponent implements OnInit, OnDestroy {
  formExpense: FormGroup;
  expense: Expense;
  loadPage: boolean = true;
  loadTypeExpense: boolean = false;
  loadCode: boolean = true;
  txtLoad: string;
  typeExpensesDB: TypeExpense[] = [];
  minDate: Date;
  maxDate: Date;
  missingDays: number;
  idExpense: string;
  // Date Expense
  configDateExpense: any = {
    inputFormat: 'DD/MM/YYYY',
    isAnimated: true,
    containerClass: 'theme-blue'
  }
  documentDB: any = DOCUMENTS;

  initialState: any;

  constructor(private expenseService: ExpenseService,
              private localService: BsLocaleService,
              private toastr: ToastrService,
              private typeExpenseService: TypeExpenseService,
              private functionService: FunctionService,
              private route: ActivatedRoute,
              private router: Router) {
    this.localService.use('es');
    this.missingDays = this.functionService.getMissingDays();
    this.minDate = new Date;
    this.maxDate = new Date;
    this.minDate.setDate(this.minDate.getDate() - this.missingDays);
    this.maxDate.setDate(this.maxDate.getDate());
   }

  ngOnInit() {
    this.formExpense = this.formGroupExpense();
    this.route.data.subscribe(
      resp => this.initialState = resp
    );
    this.txtLoad = this.initialState.txtLoad;
    this.loadTypeExpenseForm();
    switch(this.initialState.type) {
      case STORE:
        this.expenseService.changeSelectBtn(STORE);
        this.getStore();
        break;
      case UPDATE:
        this.expenseService.changeDisabled(false);
        this.expenseService.changeSelectBtn(UPDATE);
        this.getUpdate();
        break;
    }
  }

  formGroupExpense(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      code: new FormControl('',[Validators.required]),
      type_expense_id: new FormControl(null,[ Validators.required ]),
      description: new FormControl('', [ Validators.required, Validators.maxLength(180)]),
      date_expense_notFormat: new FormControl(''),
      amount: new FormControl(0,[ Validators.required, ValidatorsGlobal.valueMin(0) ]),
      document: new FormControl(null),
      serial_document: new FormControl({
        value: '',
        disabled: true
      }),
      name_responsible: new FormControl('', [ Validators.required, Validators.maxLength(100) ])
    });
  }

  loadTypeExpenseForm(): void {
    this.loadTypeExpense = false;
    this.typeExpenseService.listTypeExpenses().subscribe(
      resp => this.typeExpensesDB = resp,
      ()  => this.toastr.error('Consulte con el Administrador', 'Error al Cargar los TIPOS DE GASTOS.')
    ).add(
      () => this.loadTypeExpense = true
    );
  }

  get id() { return this.formExpense.get('id'); }
  get code() { return this.formExpense.get('code'); }
  get type_expense_id() { return this.formExpense.get('type_expense_id'); }
  get description() { return this.formExpense.get('description'); }
  get date_expense_notFormat() { return this.formExpense.get('date_expense_notFormat'); }
  get amount() { return this.formExpense.get('amount'); }
  get document() { return this.formExpense.get('document'); }
  get serial_document() { return this.formExpense.get('serial_document'); }
  get name_responsible() { return this.formExpense.get('name_responsible'); }

  assignValuesFormExpense(): void {
    this.id.setValue(this.expense.code);
    this.date_expense_notFormat.setValue(this.expenseService.convertStringToDate(this.expense.date_expense));
    this.name_responsible.setValue(this.expense.name_responsible);
    this.code.setValue(this.expense.code);
    this.type_expense_id.setValue(this.expense.typeExpense.id);
    this.document.setValue((this.expense.document) ? this.expense.document.toLowerCase() : null);
    this.serial_document.setValue(this.expense.serial_document);
    this.amount.setValue(this.expense.amount);
    this.description.setValue(this.expense.description);
    this.documentEnable();
  }

  validation(formControl: AbstractControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  saveFormExpense(): void{
    this.loadPage = false;
    let expenseData: Expense = this.formExpense.value;
    expenseData.date_expense = this.expenseService.convertDateToString(this.date_expense_notFormat.value);
    if(this.formExpense.valid) {
      if(!this.id.value) {
        this.storeForm();
      } else {
        this.updateForm();
      }
    }
  }

  getStore(): void {
    this.loadCode = false;
    this.date_expense_notFormat.setValue(new Date());
    this.expenseService.codeExpenses().subscribe(
      resp => this.code.setValue(resp),
      () => this.toastr.error('Consulte con el Administrador', 'Error no se pudo obtener CODIGO para el formulario.')
    ).add(
      () => this.loadCode = true
    );
  }

  getUpdate(): void {
    this.route.paramMap.subscribe(
      params => this.idExpense = params.get('code')
    );
    this.loadPage = false;
    this.expenseService.editExpenses(this.idExpense).subscribe(
      resp => {
        this.expense = resp;
        this.assignValuesFormExpense();
      },
      () => {
        this.toastr.error('Consulte con el Administrador.', 'Error al mostrar el formulario para Actualizar Rol.');
        this.router.navigate(['administration/roles/index']);
      }
    ).add(
      () => this.loadPage = true
    );
  }

  /**
   * Crear Gasto
   * @param expenseData
   */
  storeForm(): void {
    this.txtLoad = 'Guardando Gasto';
    this.expenseService.storeExpenses(this.formExpense.value).subscribe(
      resp => {
        this.formExpense.reset();
        this.toastr.success(resp.code, 'GASTO Creado Correctamente');
        this.getStore();
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al crear: GASTO.')
    ).add(
      () => this.loadPage = true
    );
  }

  /**
   * Actualizar Gasto 
   * @param expenseData 
   */
  updateForm(): void{
    this.txtLoad = 'Actualizando Gasto';
    this.expenseService.updateExpenses(this.formExpense.value).subscribe(
      resp => {
        this.toastr.success(resp.code, 'GASTO Actualizado Correctamente');
        this.router.navigate(['transaction/expenses/index']);
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: GASTO.')
    ).add(
      () => this.loadPage = true
    );
  }

  onChange(event) {
    if(event) {
      this.serial_document.setValidators([Validators.required, Validators.maxLength(100)]);
      this.serial_document.enable();
    } else {
      this.serial_document.reset();
      this.serial_document.clearValidators();
      this.serial_document.disable();
    }
  }

  documentEnable() {
    if(this.document.value) {
      this.serial_document.enable();
    }
  }

  ngOnDestroy() {
    if(this.initialState.type == UPDATE) {
      this.expenseService.changeDisabled(true);
      this.expenseService.expense = null;
    }
  }
}
