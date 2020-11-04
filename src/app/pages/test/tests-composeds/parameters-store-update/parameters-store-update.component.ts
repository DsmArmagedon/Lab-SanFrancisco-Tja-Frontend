import { Component, OnInit, OnDestroy, Type } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TYPE_DATA, TypeData, POST, PUT } from 'src/app/global-variables';
import { UnitService } from 'src/app/services/unit.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { GeneralService } from 'src/app/services/general.service';
import { Parameter } from 'src/app/models/parameter.model';
import { ValidationsNameDirective } from 'src/app/directives/validations-name.directive';
import { ParameterService } from 'src/app/services/parameter.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Unit } from 'src/app/models/unit.model';

@Component({
  selector: 'app-parameters-store-update',
  templateUrl: './parameters-store-update.component.html',
  styles: [],
  viewProviders: [ValidationsNameDirective]
})
export class ParametersStoreUpdateComponent implements OnInit, OnDestroy {
  formParameter: FormGroup;

  txtStatusSecParameter: string;
  loadParameter: boolean = true;
  btnStoreUpdate: string;
  titleModal: string = '';
  idCategory: number;

  nameCategory: string;
  idTest: number;
  parameter: Parameter;

  optionsDB: Array<string> = [];

  typeDataDB: any = TYPE_DATA;

  loadUnits: boolean;
  unitsDB: Array<Unit>;

  loadCategories: boolean;
  categoriesDB: Array<Category> = [];

  private onDestroy = new Subject();

  constructor(public bsModalRef: BsModalRef,
    private unitService: UnitService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private validationsDirective: ValidationsNameDirective,
    private parameterService: ParameterService,
    public gralService: GeneralService) {
  }

  ngOnInit() {
    this.formParameter = this.formGroupParameter();
    this.loadUnitsForm();
    this.loadCategoriesForm();
    this.selectedCategoryForShowForm();
    this.selectTypeFormStoreOrUpdate();
  }

  get id() { return this.formParameter.get('id'); }
  get name() { return this.formParameter.get('name'); }
  get unit_id() { return this.formParameter.get('unit_id'); }
  get category_id() { return this.formParameter.get('category_id'); }
  get type_data() { return this.formParameter.get('type_data'); }
  get reference_values() { return this.formParameter.get('reference_values'); }
  get options() { return this.formParameter.get('options'); }
  get default_value() { return this.formParameter.get('default_value'); }
  get status() { return this.formParameter.get('status'); }

  formGroupParameter() {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100)],
        asyncValidators: [this.validationsDirective.validateUniqueParameter(this.idCategory)]
      }),
      unit_id: new FormControl(null),
      category_id: new FormControl(null, Validators.required),
      type_data: new FormControl(null, Validators.required),
      reference_values: new FormControl(null, Validators.maxLength(255)),
      options: new FormControl([], { updateOn: 'change' }),
      default_value: new FormControl(null, Validators.maxLength(255)),
      status: new FormControl(1)
    },
      {
        updateOn: 'blur'
      })
  }

  assignValuesFormParameter(): void {
    this.id.setValue(this.parameter.id);
    this.name.setValue(this.parameter.name);
    this.unit_id.setValue(this.parameter.unit.id);
    this.category_id.setValue(this.parameter.category_id);
    this.type_data.setValue(this.parameter.type_data);
    this.reference_values.setValue(this.parameter.reference_values);
    this.options.setValue(this.parameter.options);
    this.default_value.setValue(this.parameter.default_value);
    this.status.setValue(this.parameter.status);
    // Spread operator: realiza una copia independiente del vector; con el operador "=" se vinculan los vectores, función opcional .slice()
    // .slice() no muta la matriz original, .splice() muta la matriz original
    // Nota: Ver copia de vectores y objetos por referencia y valor.
    this.optionsDB = [...this.parameter.options];

  }

  selectedCategoryForShowForm(): void {
    if (this.idCategory !== undefined) this.category_id.setValue(this.idCategory);
  }

  saveFormParameter(): void {
    this.loadParameter = false;
    if (this.formParameter.valid) {
      this.parameter = new Parameter(this.formParameter.value);
      !this.id.value ? this.storeForm() : this.updateForm();
    }
  }

  storeForm(): void {
    this.txtStatusSecParameter = 'Guardando Parámetro';
    this.parameterService.storeParameters(this.parameter)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadParameter = true)
      )
      .subscribe(
        resp => {
          this.toastr.success(resp.name.toUpperCase(), 'PARÁMETRO Creado Correctamente');
          this.parameterService.addParameterToIndexFromModal(resp, POST);
          this.resetFormParameter();
        },
        () => this.toastr.error('Consulte con el Administrador', 'Error al crear: PARÁMETRO')
      )
  }

  updateForm(): void {
    this.txtStatusSecParameter = 'Actualizando Parámetro';
    this.parameterService.updateParameters(this.parameter)
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(
        resp => {
          this.toastr.success(resp.name.toUpperCase(), 'PARÁMETRO Actualizado correctamente');
          this.parameterService.addParameterToIndexFromModal(resp, PUT);
          this.bsModalRef.hide();
        },
        () => this.toastr.error('Consulte con el Administrador', 'Error al actualizar: PARÁMETRO')
      );
  }

  onAddOption(event: any) {
    this.optionsDB.push(event.value);
  }

  onRemoveOption(event: string) {
    const index = this.optionsDB.findIndex(option => option !== event);
    if (index > -1) this.optionsDB.splice(index, 1);
    if (this.default_value.value === event) this.default_value.setValue(null);
  }

  loadUnitsForm(): void {
    this.loadUnits = false;
    this.unitService.listUnits()
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadUnits = true)
      ).subscribe(
        resp => this.unitsDB = resp,
        () => this.toastr.error('Consulte con el Administrador', 'Error al cargar las UNIDADES DE MEDIDA')
      )
  }

  loadCategoriesForm(): void {
    this.loadCategories = false;
    this.categoryService.listCategories(this.idTest)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadCategories = true)
      ).subscribe(
        resp => {
          this.categoriesDB = resp;
          this.categoriesDB.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          })
        },
        () => this.toastr.error('Consulte con el Administrador', 'Error al cargar las CATEGORÍAS')
      )
  }

  resetDefaultValue(event: any): void {
    switch (event.id) {
      case TypeData.NUMERIC:
      case TypeData.PARAGRAPH:
      case TypeData.TEXT:
        this.default_value.setValue('');
        this.options.clearValidators();
        this.options.reset();
        this.options.updateValueAndValidity({ onlySelf: true });
        break;
      case TypeData.OPTIONS:
        this.default_value.setValue(null);
        this.options.setValidators([Validators.required, Validators.maxLength(255)]);
        this.options.updateValueAndValidity({ onlySelf: true });
        break;
    }
  }

  resetFormParameter(): void {
    this.formParameter.reset();
    this.status.setValue(1);
  }

  selectTypeFormStoreOrUpdate(): void {
    if (this.parameter) this.assignValuesFormParameter();
    this.name.pristine
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  onChange(event) {
    this.name.markAsDirty();
    let idCategoryUpdated: number = (event.id === this.idCategory) ? this.idCategory : event.id;
    this.name.clearAsyncValidators();
    this.name.setAsyncValidators(this.validationsDirective.validateUniqueParameter(idCategoryUpdated))
    this.name.updateValueAndValidity({ onlySelf: true });
  }
}