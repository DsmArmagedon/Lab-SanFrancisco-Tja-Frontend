import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TYPE_DATA, OBJECT_TYPE_DATA, POST, PUT } from 'src/app/global-variables';
import { UnitService } from 'src/app/services/unit.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from 'src/app/models/title.model';
import { TitleService } from 'src/app/services/title.service';
import { GeneralService } from 'src/app/services/general.service';
import { Parameter } from 'src/app/models/parameter.model';
import { ValidationsNameDirective } from 'src/app/directives/validations-name.directive';
import { ParameterService } from 'src/app/services/parameter.service';
import { takeUntil, finalize, take } from 'rxjs/operators';
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
  idTitle: number;

  nameTitle: string;
  idTest: number;
  parameter: Parameter;

  optionsDB: Array<string> = [];

  typeDataDB: any = TYPE_DATA;

  loadUnits: boolean;
  unitsDB: Array<Unit>;

  loadTitles: boolean;
  titlesDB: Array<Title> = [];

  private onDestroy = new Subject();

  constructor(public bsModalRef: BsModalRef,
    private unitService: UnitService,
    private titleService: TitleService,
    private toastr: ToastrService,
    private validationsDirective: ValidationsNameDirective,
    private parameterService: ParameterService,
    public gralService: GeneralService) {
  }

  ngOnInit() {
    this.formParameter = this.formGroupParameter();
    this.loadUnitsForm();
    this.loadTitlesForm();
    this.selectedTitleForShowForm();
    this.selectTypeFormStoreOrUpdate();
  }

  get id() { return this.formParameter.get('id'); }
  get name() { return this.formParameter.get('name'); }
  get unit_id() { return this.formParameter.get('unit_id'); }
  get title_id() { return this.formParameter.get('title_id'); }
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
        asyncValidators: [this.validationsDirective.validateUniqueParameter(this.idTitle)]
      }),
      unit_id: new FormControl(null),
      title_id: new FormControl(null, Validators.required),
      type_data: new FormControl('texto', Validators.required),
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
    this.title_id.setValue(this.parameter.title.id);
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

  selectedTitleForShowForm(): void {
    if (this.idTitle !== undefined) this.title_id.setValue(this.idTitle);
  }

  saveFormParameter(): void {
    this.loadParameter = false;
    if (this.formParameter.valid) {
      this.parameter = Object.assign(new Parameter, this.formParameter.value);
      !this.id.value ? this.storeForm() : this.updateForm();
    }
  }

  storeForm(): void {
    this.txtStatusSecParameter = 'Guardando Parametro';
    this.parameterService.storeParameters(this.parameter)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadParameter = true)
      )
      .subscribe(
        resp => {
          this.toastr.success(resp.name.toUpperCase(), 'PARAMETRO Creado Correctamente');
          this.parameterService.addParameterToIndexFromModal(resp, POST);
          this.resetFormParameter();
        },
        () => this.toastr.error('Consulte con el Administrador', 'Error al crear: PARAMETRO')
      )
  }

  updateForm(): void {
    this.txtStatusSecParameter = 'Actualizando Parámetro';
    this.parameterService.updateParameters(this.parameter)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadParameter = true)
      )
      .subscribe(
        resp => {
          this.toastr.success(resp.name.toUpperCase(), 'PARAMETRO Actualizado correctamente');
          this.parameterService.addParameterToIndexFromModal(resp, PUT);
          this.bsModalRef.hide();
        },
        () => this.toastr.error('Consulte con el Administrador', 'Error al actualizar: PARAMETRO')
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
        resp => this.unitsDB = resp.units,
        () => this.toastr.error('Consulte con el Administrador', 'Error al cargar las UNIDADES DE MEDIDA')
      )
  }

  loadTitlesForm(): void {
    this.loadTitles = false;
    this.titleService.listTitles(this.idTest)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadTitles = true)
      ).subscribe(
        resp => {
          this.titlesDB = resp;
          this.titlesDB.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          })
        },
        () => this.toastr.error('Consulte con el Administrador', 'Error al cargar los TÍTULOS')
      )
  }

  resetDefaultValue(event: any): void {
    switch (event.id) {
      case OBJECT_TYPE_DATA.numerico:
      case OBJECT_TYPE_DATA.parrafo:
      case OBJECT_TYPE_DATA.texto:
        this.default_value.setValue('');
        this.options.clearValidators();
        this.options.reset();
        this.options.updateValueAndValidity({ onlySelf: true });
        break;
      case OBJECT_TYPE_DATA.opciones:
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
    let idTitleUpdated: number = (event.id === this.idTitle) ? this.idTitle : event.id;
    this.name.clearAsyncValidators();
    this.name.setAsyncValidators(this.validationsDirective.validateUniqueParameter(idTitleUpdated))
    this.name.updateValueAndValidity({ onlySelf: true });
  }
}