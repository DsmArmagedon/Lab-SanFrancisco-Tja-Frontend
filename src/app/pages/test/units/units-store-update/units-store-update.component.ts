import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Unit } from 'src/app/models/unit.model';
import { UnitService } from '../../../../services/unit/unit.service';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/services/common/general.service';
import { ValidationsNameDirective } from 'src/app/directives/validations-name.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { STORE, UPDATE } from 'src/app/global-variables';

@Component({
  selector: 'app-units-store-update',
  templateUrl: './units-store-update.component.html',
  styles: [],
  providers: [ValidationsNameDirective]
})
export class UnitsStoreUpdateComponent implements OnInit, OnDestroy {
  formUnit: FormGroup;
  unit: Unit;
  txtLoad: string;
  loadPage: boolean = true;
  display: string;
  idUnit: number;
  initialState: any;
  constructor(private unitService: UnitService,
    private toastr: ToastrService,
    public gralService: GeneralService,
    private validationsDirective: ValidationsNameDirective,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.formUnit = this.formGroupUnit();
    this.initialState = this.gralService.getDataInitialState(this.route);
    this.selectTypeFormStoreOrUpdate();
  }

  formGroupUnit(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100)],
        asyncValidators: [this.validationsDirective.validateUniqueUnit.bind(this.validationsDirective)]
      }),
      note: new FormControl('', [Validators.maxLength(255)]),
      status: new FormControl(1)
    });
  }

  get id() { return this.formUnit.get('id'); }
  get name() { return this.formUnit.get('name'); }
  get note() { return this.formUnit.get('note'); }
  get status() { return this.formUnit.get('status'); }

  assignValuesFormUnit(): void {
    this.id.setValue(this.unit.id);
    this.name.setValue(this.unit.name);
    this.note.setValue(this.unit.note);
    this.display = this.unit.display;
    this.status.setValue(this.unit.status);
  }

  getUpdate(): void {
    this.txtLoad = this.initialState.txtLoad;
    this.getIdToParameterFromUrl();
    this.loadPage = false;
    this.unitService.editShowUnits(this.idUnit).subscribe(
      resp => {
        this.unit = resp;
        this.assignValuesFormUnit();
      },
      () => {
        this.toastr.error('Consulte con el Administrador', 'Error al mostrar el formulario para Actualizar el UNIDAD DE MEDIDA');
        this.router.navigate(['administration/units/index']);
      }
    ).add(
      () => this.loadPage = true
    );
  }

  saveFormUnit(): void {
    if (this.formUnit.valid) {
      this.loadPage = false;
      if (!this.id.value) {
        this.storeForm();
      } else {
        this.updateForm();
      }
    }
  }

  storeForm(): void {
    this.txtLoad = 'Guardando Unidad de Medida';
    this.unitService.storeUnits(this.formUnit.value).subscribe(
      resp => {
        this.toastr.success(resp.name, 'UNIDAD DE MEDIDA Creado Correctamente');
        this.resetFormUnit();
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al crear: UNIDAD DE MEDIDA.')
    ).add(
      () => this.loadPage = true
    );
  }

  updateForm(): void {
    this.txtLoad = 'Actualizando Unidad de Medida';
    this.unitService.updateUnits(this.formUnit.value).subscribe(
      resp => {
        this.toastr.success(resp.name, 'UNIDAD DE MEDIDA Actualizado Correctamente');
        this.router.navigate(['test/units/index']);
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: UNIDAD DE MEDIDA.'),
    ).add(
      () => this.loadPage = true
    );
  }

  showDisplay(): void {
    let valueName: string = this.name.value;
    let valueNameHtml: string = '';
    let sup: string;
    let size: number = valueName.length;
    let status: number = 1;
    for (let i = 0; i < size; i++) {
      switch (status) {
        case 1:
          if (valueName.charAt(i) != '^') {
            status = 2;
            valueNameHtml += valueName.charAt(i);
          }
          break;
        case 2:
          if (valueName.charAt(i) == '^') {
            status = 3;
            sup = '';
          } else {
            valueNameHtml += valueName.charAt(i);
          }
          break;
        case 3:
          if (valueName.charAt(i) == '[') {
            status = 5;
          } else {
            status = 4;
            sup = valueName.charAt(i);
            if (i == size - 1) {
              valueNameHtml += '<sup>' + sup + '</sup>';
            }
          }
          break;
        case 4:
          sup += valueName.charAt(i);
          if (i == size - 1) {
            valueNameHtml += '<sup>' + sup + '</sup>';
          }
          break;
        case 5:
          if (valueName.charAt(i) != ']') {
            status = 6;
            sup = valueName.charAt(i);
            if (i == size - 1) {
              valueNameHtml += '<sup>' + sup + '</sup>';
            }
          }
          break;
        case 6:
          if (valueName.charAt(i) == ']') {
            status = 1;
            valueNameHtml += '<sup>' + sup + '</sup>';
          } else {
            sup += valueName.charAt(i);
            if (i == size - 1) {
              valueNameHtml += '<sup>' + sup + '</sup>';
            }
          }
          break;
      }
    }
    this.display = valueNameHtml;
  }
  addSym() {
    this.name.setValue(this.name.value + '^');
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
      params => this.idUnit = parseInt(params.get('id'))
    );

  }

  resetFormUnit(): void {
    this.formUnit.reset();
    this.display = '';
    this.status.setValue(1);
  }

  ngOnDestroy() {
    if (this.initialState.type == UPDATE) {
      this.gralService.changeDisabled(true);
    }
  }
}
