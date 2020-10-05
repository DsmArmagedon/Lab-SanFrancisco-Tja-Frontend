import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';;
import { ToastrService } from 'ngx-toastr';
import { Expense } from 'src/app/models/expense.model';
import { DOCUMENTS, STORE, UPDATE, CONFIG_DATEPICKER, DATE_FORMAT } from 'src/app/global-variables';
import { ExpenseService } from 'src/app/services/expense.service';
import { TypeExpenseService } from 'src/app/services/type-expense.service';
import { ValidatorsGlobal } from 'src/app/validators/validators-global';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { ValidatorsPattern } from 'src/app/validators/validators-pattern';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TypeExpense } from 'src/app/models/type-expense.model';
import * as moment from 'moment';
@Component({
  selector: 'app-expenses-store-update',
  templateUrl: './expenses-store-update.component.html',
  styles: []
})
export class ExpensesStoreUpdateComponent implements OnInit, OnDestroy {
  formExpense: FormGroup;
  expense: Expense;
  loadExpense: boolean = true;
  loadTypeExpense: boolean = false;
  loadCode: boolean = true;
  txtStatusSecExpense: string;
  typeExpensesDB: TypeExpense[] = [];
  minDate: Date;
  maxDate: Date;
  idExpense: string;
  // Date Expense
  configDateExpense: any = CONFIG_DATEPICKER;
  documentDB: any = DOCUMENTS;

  initialState: any;

  private onDestroy = new Subject();

  constructor(private expenseService: ExpenseService,
    private localService: BsLocaleService,
    private toastr: ToastrService,
    private typeExpenseService: TypeExpenseService,
    private route: ActivatedRoute,
    private router: Router,
    public gralService: GeneralService) {
    this.localService.use('es');
    this.minDate = moment().subtract(1, 'month').startOf('month').toDate();
    this.maxDate = new Date();
  }

  ngOnInit() {
    this.formExpense = this.formGroupExpense();
    this.initialState = this.gralService.getDataInitialState(this.route);
    this.txtStatusSecExpense = this.initialState.txtLoad;
    this.loadTypeExpenseForm();
    this.selectTypeFormStoreOrUpdate();
  }

  get id() { return this.formExpense.get('id'); }
  get code() { return this.formExpense.get('code'); }
  get type_expense_id() { return this.formExpense.get('type_expense_id'); }
  get description() { return this.formExpense.get('description'); }
  get date_expense() { return this.formExpense.get('date_expense'); }
  get amount() { return this.formExpense.get('amount'); }
  get document() { return this.formExpense.get('document'); }
  get serial_document() { return this.formExpense.get('serial_document'); }
  get name_responsible() { return this.formExpense.get('name_responsible'); }

  formGroupExpense(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      code: new FormControl('', [Validators.required]),
      type_expense_id: new FormControl(null, [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      date_expense: new FormControl(''),
      amount: new FormControl(0, [Validators.required, ValidatorsGlobal.valueMin(0)]),
      document: new FormControl(null, [Validators.required]),
      name_responsible: new FormControl('', [Validators.required, Validators.maxLength(100), ValidatorsPattern.alphaSpacePattern])
    },
      {
        updateOn: 'blur'
      });
  }

  assignValuesFormExpense(): void {
    this.id.setValue(this.expense.code);
    this.date_expense.setValue(this.expense.date_expense.format(DATE_FORMAT));
    this.name_responsible.setValue(this.expense.name_responsible);
    this.code.setValue(this.expense.code);
    this.type_expense_id.setValue(this.expense.typeExpense.id);
    this.document.setValue((this.expense.document) ? this.expense.document.toLowerCase() : null);
    this.amount.setValue(this.expense.amount);
    this.description.setValue(this.expense.description);
  }

  getStore(): void {
    this.loadCode = false;
    this.date_expense.setValue(new Date());
    this.expenseService.codeExpenses()
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadCode = true)
      )
      .subscribe(
        resp => this.code.setValue(resp),
        () => this.toastr.error('Consulte con el Administrador', 'Error no se pudo obtener CODIGO para el formulario.')
      );
  }

  getUpdate(): void {
    this.loadExpense = false;
    this.getIdToParameterFromUrl();
    this.expenseService.editExpenses(this.idExpense)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadExpense = true)
      )
      .subscribe(
        resp => {
          this.expense = resp;
          this.addIfTypeExpenseIsFalse();
          this.assignValuesFormExpense();
        },
        () => {
          this.toastr.error('Consulte con el Administrador.', 'Error al mostrar el formulario para Actualizar Rol.');
          this.router.navigate(['administration/roles/index']);
        }
      );
  }

  addIfTypeExpenseIsFalse(): void {
    !this.expense.typeExpense.status && this.typeExpensesDB.push(this.expense.typeExpense);
  }

  saveFormExpense(): void {
    this.loadExpense = false;
    this.expense = new Expense(this.formExpense.value);
    if (this.formExpense.valid) {
      (!this.id.value) ? this.storeForm() : this.updateForm();
    }
  }

  storeForm(): void {
    this.txtStatusSecExpense = 'Guardando Gasto';
    this.expenseService.storeExpenses(this.expense)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadExpense = true)
      )
      .subscribe(
        resp => {
          this.formExpense.reset();
          this.toastr.success(resp.code, 'GASTO Creado Correctamente');
          this.getStore();
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al crear: GASTO.')
      );
  }

  updateForm(): void {
    this.txtStatusSecExpense = 'Actualizando Gasto';
    this.expenseService.updateExpenses(this.expense)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadExpense = true)
      )
      .subscribe(
        resp => {
          this.toastr.success(resp.code, 'GASTO Actualizado Correctamente');
          this.router.navigate(['transaction/expenses/index']);
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: GASTO.')
      );
  }

  loadTypeExpenseForm(): void {
    this.loadTypeExpense = false;
    this.typeExpenseService.listTypeExpenses()
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadTypeExpense = true)
      )
      .subscribe(
        resp => this.typeExpensesDB = resp,
        () => this.toastr.error('Consulte con el Administrador', 'Error al Cargar los TIPOS DE GASTOS.')
      );
  }

  selectTypeFormStoreOrUpdate(): void {
    switch (this.initialState.type) {
      case STORE:
        this.gralService.changeSelectBtn(STORE);
        this.getStore();
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
      params => this.idExpense = params.get('code')
    );
  }

  ngOnDestroy() {
    if (this.initialState.type == UPDATE) this.gralService.changeDisabled(true);
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
