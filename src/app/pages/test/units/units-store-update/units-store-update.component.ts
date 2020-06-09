import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Unit } from 'src/app/models/unit.model';
import { UnitService } from '../../../../services/unit/unit.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-units-store-update',
  templateUrl: './units-store-update.component.html',
  styles: []
})
export class UnitsStoreUpdateComponent implements OnInit {
  @Output() executeIndex: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectRowIndexNull: EventEmitter<any> = new EventEmitter<any>();

  formUnit: FormGroup;
  unit: Unit;
  txtLoad: string;
  loadPage: boolean = true;
  loadPageStoreUpdate: boolean = true;

  stateStore: any = {
    title: 'Crear Unidad de Medida',
    btnStoreUpdate: 'Guardar'
  }

  stateUpdate: any = {
    title: 'Editar Unidad de Medida',
    btnStoreUpdate: 'Actualizar'
  }

  initialState: any;
  constructor(private unitService: UnitService,
              private toastr: ToastrService) {
    this.initialState = this.stateStore;
  }

  value: string;
  ngOnInit() {
    this.formUnit = this.formGroupUnit();
    this.unitService.updateUnitObservable.subscribe(
      resp => {
        this.unit = resp;
        this.initialState = this.stateUpdate;
        this.assignValuesFormUnit();
      }
    );
  }

  formGroupUnit(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl(''),
      note: new FormControl(''),
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
    this.value = this.unit.display;
    this.status.setValue(this.unit.status);
  }

  validation(formControl: AbstractControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  saveFormUnit(): void {
    if(this.formUnit.valid) {
      this.loadPageStoreUpdate = false;
      if(!this.id.value) {
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
        this.executeIndex.emit();
        this.resetFormUnit();
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al crear: UNIDAD DE MEDIDA.')
    ).add(
      () => this.loadPageStoreUpdate = true
    );
  }

  updateForm(): void {
    this.txtLoad = 'Actualizando Unidad de Medida';
    this.unitService.updateUnits(this.formUnit.value).subscribe(
      resp => {
        this.toastr.success(resp.name, 'UNIDAD DE MEDIDA Actualizado Correctamente');
        this.executeIndex.emit();
        this.selectRowIndexNull.emit();
        this.resetFormUnit();
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: UNIDAD DE MEDIDA.'),
    ).add(
      () => this.loadPageStoreUpdate = true
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
    this.value = valueNameHtml;
  }
  addSym() {
    this.name.setValue(this.name.value + '^');
  }

  resetFormUnit(): void {
    this.formUnit.reset();
    this.value = '';
    this.status.setValue(1);
  }

  getStore(): void {
    this.resetFormUnit();
    this.initialState = this.stateStore;
    this.selectRowIndexNull.emit();
    this.unitService.unitEdit = new Unit;
  }
}
