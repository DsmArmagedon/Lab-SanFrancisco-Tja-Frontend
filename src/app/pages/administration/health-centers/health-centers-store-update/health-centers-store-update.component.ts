import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HealthCenterService } from '../../../../services/health-center/health-center.service';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsPattern } from '../../../../validators/validators-pattern';
import { ValidationsNameDirective } from '../../../../directives/validations-name.directive';
import { GeneralService } from 'src/app/services/common/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { STORE, UPDATE } from 'src/app/global-variables';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HealthCenter } from 'src/app/models/health-center/health-center.model';

@Component({
  selector: 'app-health-centers-store-update',
  templateUrl: './health-centers-store-update.component.html',
  styles: [],
  providers: [ValidationsNameDirective]
})
export class HealthCentersStoreUpdateComponent implements OnInit {
  loadHealthCenter: boolean = true;
  txtStatusSecHealthCenter: string;
  healthCenter: HealthCenter;
  formHealthCenter: FormGroup;
  idHealthCenter: number;
  initialState: any;

  private onDestroy = new Subject();

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
        asyncValidators: [this.validationsDirective.validateUniqueHealthCenter()]
      }),
      deduction: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      phone: new FormControl('', [Validators.maxLength(100)]),
      information: new FormControl('', [Validators.maxLength(255)]),
      status: new FormControl(1)
    },
      {
        updateOn: 'blur'
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
    this.txtStatusSecHealthCenter = this.initialState.txtLoad;
    this.getIdToParameterFromUrl();
    this.loadHealthCenter = false;
    this.healthCenterService.editShowHealthCenters(this.idHealthCenter)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadHealthCenter = true)
      )
      .subscribe(
        resp => {
          this.healthCenter = resp;
          this.assignValuesFormHealthCenter();
        },
        () => {
          this.toastr.error('Consulte con el Administrador', 'Error al mostrar el formulario para Actualizar el CENTRO DE SALUD');
          this.router.navigate(['administration/health-centers/index']);
        }
      )
  }

  saveFormHealthCenter(): void {
    if (this.formHealthCenter.valid) {
      this.healthCenter = Object.assign(new HealthCenter, this.formHealthCenter.value);
      this.loadHealthCenter = false;
      (!this.id.value) ? this.storeForm() : this.updateForm();
    }
  }

  storeForm(): void {
    this.txtStatusSecHealthCenter = 'Guardando Centro de Salud';
    this.healthCenterService.storeHealthCenters(this.healthCenter)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadHealthCenter = true)
      )
      .subscribe(
        resp => {
          this.toastr.success(resp.name.toUpperCase(), 'CENTRO DE SALUD Creado Correctamente');
          this.resetFormHealthCenter();
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al crear: CENTRO DE SALUD.')
      )
  }

  updateForm(): void {
    this.txtStatusSecHealthCenter = 'Actualizando Centro de Salud';
    this.healthCenterService.updateHealthCenters(this.healthCenter)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadHealthCenter = true)
      )
      .subscribe(
        resp => {
          this.toastr.success(resp.name.toUpperCase(), 'CENTRO DE SALUD Actualizado Correctamente');
          this.router.navigate(['administration/health-centers/index']);
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: CENTRO DE SALUD.')
      )
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
    if (this.initialState.type == Date) this.gralService.changeDisabled(true);
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
