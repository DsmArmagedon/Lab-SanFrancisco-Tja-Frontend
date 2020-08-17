import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyPositionService } from 'src/app/services/company-position.service';
import { CompanyPosition } from 'src/app/models/company-position.model';
import { ValidatorsPattern } from 'src/app/validators/validators-pattern';
import { ValidationsNameDirective } from 'src/app/directives/validations-name.directive';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/services/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { STORE, UPDATE } from 'src/app/global-variables';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-companies-positions-store-update',
  templateUrl: './companies-positions-store-update.component.html',
  providers: [ValidationsNameDirective]
})
export class CompaniesPositionsStoreUpdateComponent implements OnInit {
  formCompanyPosition: FormGroup;
  txtStatusSecCompanyPosition: string;
  loadCompanyPosition: boolean = true;
  companyPosition: CompanyPosition;
  initialState: any;
  idCompanyPosition: number;

  private onDestroy = new Subject();

  constructor(private companyPositionService: CompanyPositionService,
    private validationsDirective: ValidationsNameDirective,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public gralService: GeneralService,
    private router: Router) {
  }

  ngOnInit() {
    this.formCompanyPosition = this.formGroupCompanyPosition();
    this.initialState = this.gralService.getDataInitialState(this.route);
    this.selectTypeFormStoreOrUpdate();
  }

  get id() { return this.formCompanyPosition.get('id'); }
  get name() { return this.formCompanyPosition.get('name'); }
  get description() { return this.formCompanyPosition.get('description') }
  get status() { return this.formCompanyPosition.get('status'); }

  formGroupCompanyPosition(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100), ValidatorsPattern.alphaNumericSpacePattern],
        asyncValidators: [this.validationsDirective.validateUniqueCompanyPosition()]
      }),
      description: new FormControl('', {
        validators: [Validators.maxLength(255)]
      }),
      status: new FormControl(1)
    },
      {
        updateOn: 'blur'
      });
  }

  assignValuesFormCompanyPosition(): void {
    this.id.setValue(this.companyPosition.id);
    this.name.setValue(this.companyPosition.name);
    this.description.setValue(this.companyPosition.description);
    this.status.setValue(this.companyPosition.status);
  }

  getUpdate(): void {
    this.txtStatusSecCompanyPosition = this.initialState.txtLoad;
    this.getIdToParameterFromUrl();
    this.loadCompanyPosition = false;
    this.companyPositionService.editShowCompanyPositions(this.idCompanyPosition)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadCompanyPosition = true)
      )
      .subscribe(
        resp => {
          this.companyPosition = resp;
          this.assignValuesFormCompanyPosition();
        },
        () => {
          this.toastr.error('Consulte con el Administrador', 'Error al mostrar el formulario para Actualizar el CARGO');
          this.router.navigate(['administration/companies-positions/index']);
        }
      )
  }

  saveFormCompanyPosition(): void {
    if (this.formCompanyPosition.valid) {
      this.companyPosition = Object.assign(new CompanyPosition, this.formCompanyPosition.value);
      this.loadCompanyPosition = false;
      (!this.id.value) ? this.storeForm() : this.updateForm();
    }
  }

  storeForm(): void {
    this.txtStatusSecCompanyPosition = 'Guardando Cargo';
    this.companyPositionService.storeCompanyPositions(this.companyPosition)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadCompanyPosition = true)
      ).subscribe(
        resp => {
          this.resetFormCompanyPosition();
          this.toastr.success(resp.name.toUpperCase(), 'CARGO Creado Correctamente');
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al crear: CARGO.')
      )
  }

  updateForm(): void {
    this.txtStatusSecCompanyPosition = 'Actualizando Cargo';
    this.companyPositionService.updateCompanyPositions(this.companyPosition)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadCompanyPosition = true)
      )
      .subscribe(
        resp => {
          this.toastr.success(resp.name.toUpperCase(), 'CARGO Actualizado Correctamente');
          this.router.navigate(['administration/companies-positions/index']);
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: CARGO.'),
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
      params => this.idCompanyPosition = parseInt(params.get('id'))
    );

  }

  resetFormCompanyPosition(): void {
    this.formCompanyPosition.reset();
    this.status.setValue(1);
  }

  ngOnDestroy() {
    if (this.initialState.type == UPDATE) this.gralService.changeDisabled(true);
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
