import { HealthCenter } from './../../../../models/health-center.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HealthCenterService } from '../../../../services/health-center/health-center.service';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsPattern } from '../../../../validators/validators-pattern';
import { ValidationsNameDirective } from '../../../../directives/validations-name.directive';
import { GeneralService } from 'src/app/services/common/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { STORE, UPDATE } from 'src/app/global-variables';

@Component({
  selector: 'app-health-centers-store-update',
  templateUrl: './health-centers-store-update.component.html',
  styles: [],
  providers: [ValidationsNameDirective]
})
export class HealthCentersStoreUpdateComponent implements OnInit {
  loadPage: boolean = true;
  txtLoad: string;
  healthCenter: HealthCenter;
  formHealthCenter: FormGroup;
  idHealthCenter: number;
  initialState: any;

  constructor(private healthCenterService: HealthCenterService,
    private validationsDirective: ValidationsNameDirective,
    private toastr: ToastrService,
    public gralService: GeneralService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.formHealthCenter = this.formGroupHealthCenter();
    this.initialState = this.gralService.getDataInitialState(this.route);
    this.selectTypeFormStoreOrUpdate();
  }

  get id() { return this.formHealthCenter.get('id'); }
  get name() { return this.formHealthCenter.get('name'); }
  get deduction() { return this.formHealthCenter.get('deduction'); }
  get phone() { return this.formHealthCenter.get('phone'); }
  get information() { return this.formHealthCenter.get('information'); }
  get status() { return this.formHealthCenter.get('status'); }

  formGroupHealthCenter(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100), ValidatorsPattern.alphaNumericSpacePattern],
        asyncValidators: [this.validationsDirective.validateUniqueHealthCenter.bind(this.validationsDirective)]
      }),
      deduction: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      phone: new FormControl('', [Validators.maxLength(100)]),
      information: new FormControl('', [Validators.maxLength(255)]),
      status: new FormControl(1)
    });
  }

  assignValuesFormHealthCenter(): void {
    this.id.setValue(this.healthCenter.id);
    this.name.setValue(this.healthCenter.name);
    this.deduction.setValue(this.healthCenter.deduction);
    this.phone.setValue(this.healthCenter.phone);
    this.information.setValue(this.healthCenter.information);
    this.status.setValue(this.healthCenter.status);
  }

  getUpdate(): void {
    this.txtLoad = this.initialState.txtLoad;
    this.getIdToParameterFromUrl();
    this.loadPage = false;
    this.healthCenterService.editShowHealthCenters(this.idHealthCenter).subscribe(
      resp => {
        this.healthCenter = resp;
        this.assignValuesFormHealthCenter();
      },
      () => {
        this.toastr.error('Consulte con el Administrador', 'Error al mostrar el formulario para Actualizar el CENTRO DE SALUD');
        this.router.navigate(['administration/health-centers/index']);
      }
    ).add(
      () => this.loadPage = true
    );
  }

  saveFormHealthCenter(): void {
    if (this.formHealthCenter.valid) {
      this.loadPage = false;
      if (!this.id.value) {
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
        this.resetFormHealthCenter();
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al crear: CENTRO DE SALUD.')
    ).add(
      () => this.loadPage = true
    );
  }

  updateForm(): void {
    this.txtLoad = 'Actualizando Centro de Salud';
    this.healthCenterService.updateHealthCenters(this.formHealthCenter.value).subscribe(
      resp => {
        this.toastr.success(resp.name.toUpperCase(), 'CENTRO DE SALUD Actualizado Correctamente');
        this.router.navigate(['administration/health-centers/index']);
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: CENTRO DE SALUD.')
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
      params => this.idHealthCenter = parseInt(params.get('id'))
    );

  }

  resetFormHealthCenter(): void {
    this.formHealthCenter.reset();
    this.deduction.setValue(0);
    this.status.setValue(1);
  }

  ngOnDestroy() {
    if (this.initialState.type == Date) {
      this.gralService.changeDisabled(true);
    }
  }
}
