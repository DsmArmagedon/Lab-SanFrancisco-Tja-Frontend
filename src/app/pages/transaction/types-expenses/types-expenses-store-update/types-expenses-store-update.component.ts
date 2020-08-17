import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TypeExpenseService } from 'src/app/services/type-expense.service';
import { ValidatorsPattern } from 'src/app/validators/validators-pattern';
import { ValidationsNameDirective } from 'src/app/directives/validations-name.directive';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/services/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { STORE, UPDATE } from 'src/app/global-variables';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { TypeExpense } from 'src/app/models/type-expense.model';

@Component({
  selector: 'app-types-expenses-store-update',
  templateUrl: './types-expenses-store-update.component.html',
  styles: [],
  providers: [ValidationsNameDirective]
})
export class TypesExpensesStoreUpdateComponent implements OnInit, OnDestroy {
  formTypeExpense: FormGroup;
  typeExpense: TypeExpense;
  txtStatusSecTypeExpense: string;
  loadTypeExpense: boolean = true;
  initialState: any;
  idTypeExpense: number;

  private onDestroy = new Subject();

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
        asyncValidators: [this.validationsDirective.validateUniqueTypeExpense()],
      }),
      description: new FormControl('', [Validators.maxLength(255)]),
      status: new FormControl(1)
    },
      {
        updateOn: 'blur'
      });
  }

  assignValuesFormTypeExpense(): void {
    this.id.setValue(this.typeExpense.id);
    this.name.setValue(this.typeExpense.name);
    this.description.setValue(this.typeExpense.description);
    this.status.setValue(this.typeExpense.status);
  }

  getUpdate(): void {
    this.txtStatusSecTypeExpense = this.initialState.txtLoad;
    this.getIdToParameterFromUrl();
    this.loadTypeExpense = false;
    this.typeExpenseService.editShowTypeExpenses(this.idTypeExpense)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadTypeExpense = true)
      )
      .subscribe(
        resp => {
          this.typeExpense = resp;
          this.assignValuesFormTypeExpense();
        },
        () => {
          this.toastr.error('Consulte con el Administrador', 'Error al mostrar el formulario para Actualizar el CARGO');
          this.router.navigate(['transaction/types-expenses/index']);
        }
      );
  }

  saveFormTypeExpense(): void {
    if (this.formTypeExpense.valid) {
      this.typeExpense = Object.assign(new TypeExpense, this.formTypeExpense.value);
      this.loadTypeExpense = false;
      !this.id.value ? this.storeForm() : this.updateForm();
    }
  }

  storeForm(): void {
    this.txtStatusSecTypeExpense = 'Guardando Tipo de Gasto';
    this.typeExpenseService.storeTypeExpenses(this.typeExpense)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadTypeExpense = true)
      )
      .subscribe(
        resp => {
          this.toastr.success(resp.name.toUpperCase(), 'TIPO DE GASTO Creado Correctamente');
          this.resetFormTypeExpense();
        },
        () =>
          this.toastr.error('Consulte con el Administrador.', 'Error al crear: TIPO DE GASTO.')
      );
  }

  updateForm(): void {
    this.txtStatusSecTypeExpense = 'Actualizando Tipo de Gasto';
    this.typeExpenseService.updateTypeExpenses(this.typeExpense)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadTypeExpense = true)
      )
      .subscribe(
        resp => {
          this.toastr.success(resp.name.toUpperCase(), 'TIPO DE GASTO Actualizado Correctamente');
          this.router.navigate(['transaction/types-expenses/index']);
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: TIPO DE GASTO.'),
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
    if (this.initialState.type == UPDATE) this.gralService.changeDisabled(true);
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
