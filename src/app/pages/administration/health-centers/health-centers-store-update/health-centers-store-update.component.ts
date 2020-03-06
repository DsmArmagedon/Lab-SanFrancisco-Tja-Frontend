import { HealthCenter } from './../../../../models/health-center.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HealthCenterService } from '../../../../services/health-center/health-center.service';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsPattern } from '../../../../validators/validators-pattern';
import { ValidationsNameDirective } from '../../../../directives/validations-name.directive';

@Component({
  selector: 'app-health-centers-store-update',
  templateUrl: './health-centers-store-update.component.html',
  styles: [],
  providers: [ ValidationsNameDirective ]
})
export class HealthCentersStoreUpdateComponent implements OnInit {
  loadPageStoreUpdate: boolean = true;
  loadPage: boolean = true;
  txtLoad: string;
  healthCenter: HealthCenter;
  formHealthCenter: FormGroup;
  stateStore: any = {
    title: 'Crear Centro de Salud',
    btnStoreUpdate: 'Guardar'
  };
  stateUpdate: any = {
    title: 'Editar Centro de Salud',
    btnStoreUpdate: 'Actualizar'
  }
  @Output() selectRowIndexNull: EventEmitter<any> = new EventEmitter<any>();
  @Output() executeIndex: EventEmitter<any> = new EventEmitter<any>();
  initialState: any;
  constructor(private healthCenterService: HealthCenterService,
              private validationsDirective: ValidationsNameDirective,
              private toastr: ToastrService) {
    this.initialState = this.stateStore;
   }
  ngOnInit() {
    this.formHealthCenter = this.formGroupHealthCenter();
    this.healthCenterService.editHealthCenterObservable.subscribe(
      resp => {
        this.formHealthCenter.reset();
        this.initialState = this.stateUpdate;
        this.healthCenter = resp;
        this.assignValuesFormHealthCenter();
      }
    );
  }

  formGroupHealthCenter(): FormGroup{
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', {
        validators: [ Validators.required, Validators.maxLength(100), ValidatorsPattern.alphaNumericSpacePattern ],
        asyncValidators: [ this.validationsDirective.validateUniqueHealthCenter.bind(this.validationsDirective) ]
      }),
      deduction: new FormControl(0, [ Validators.required, Validators.min(0), Validators.max(100) ]),
      phone: new FormControl('', [ Validators.maxLength(50) ]),
      information: new FormControl('', [ Validators.maxLength(180) ]),
      status: new FormControl(1)
    });
  }
  assignValuesFormHealthCenter() {
    this.id.setValue(this.healthCenter.id);
    this.name.setValue(this.healthCenter.name);
    this.deduction.setValue(this.healthCenter.deduction);
    this.phone.setValue(this.healthCenter.phone);
    this.information.setValue(this.healthCenter.information);
    this.status.setValue(this.healthCenter.status);
  }

  get id() { return this.formHealthCenter.get('id'); }
  get name() { return this.formHealthCenter.get('name'); }
  get deduction() { return this.formHealthCenter.get('deduction'); }
  get phone() { return this.formHealthCenter.get('phone'); }
  get information() { return this.formHealthCenter.get('information'); }
  get status() { return this.formHealthCenter.get('status'); }
  
  saveFormHealthCenter(): void {
    if(this.formHealthCenter.valid) {
      this.loadPageStoreUpdate = false;
      if(!this.id.value) {
        this.storeForm();
      } else {
        this.updateForm();
      }
    }
  }

  storeForm(): void {
    this.txtLoad = 'Guardando Centro de Salud';
    this.healthCenterService.storeHealthCenters(this.formHealthCenter.value).subscribe(
      resp => {
        this.toastr.success(resp.name.toUpperCase(), 'CENTRO DE SALUD Creado Correctamente');
        this.executeIndex.emit();
        this.resetFormHealthCenter();
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al crear: CENTRO DE SALUD.')
    ).add(
      () => this.loadPageStoreUpdate = true
    );
  }

  updateForm(): void {
    this.txtLoad = 'Actualizando Centro de Salud';
    this.healthCenterService.updateHealthCenters(this.formHealthCenter.value).subscribe(
      resp => {
        this.toastr.success(resp.name.toUpperCase(), 'CENTRO DE SALUD Actualizado Correctamente');
        this.executeIndex.emit();
        this.selectRowIndexNull.emit();
        this.resetFormHealthCenter();
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: CENTRO DE SALUD.')
    ).add(
      () => this.loadPageStoreUpdate = true
    );
  }

  getStore(): void {
    this.formHealthCenter.reset();
    this.status.setValue(1);
    this.initialState = this.stateStore;
    this.selectRowIndexNull.emit();
    this.healthCenterService.healthCenterEdit = new HealthCenter;
  }
  validation(formControl: FormControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  resetFormHealthCenter(): void {
    this.formHealthCenter.reset();
    this.status.setValue(1);
  }
}
