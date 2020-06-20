import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyPositionService } from '../../../../services/company-position/company-position.service';
import { CompanyPosition } from 'src/app/models/company-position.model';
import { ValidatorsPattern } from '../../../../validators/validators-pattern';
import { ValidationsNameDirective } from '../../../../directives/validations-name.directive';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/services/common/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { STORE, UPDATE } from 'src/app/global-variables';

@Component({
  selector: 'app-companies-positions-store-update',
  templateUrl: './companies-positions-store-update.component.html',
  providers: [ValidationsNameDirective]
})
export class CompaniesPositionsStoreUpdateComponent implements OnInit {
  formCompanyPosition: FormGroup;
  txtLoad: string;
  loadPage: boolean = true;
  companyPosition: CompanyPosition;
  initialState: any;
  idCompanyPosition: number;

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
        asyncValidators: [this.validationsDirective.validateUniqueCompanyPosition.bind(this.validationsDirective)]
      }),
      description: new FormControl('', {
        validators: [Validators.maxLength(255)]
      }),
      status: new FormControl(1)
    });
  }

  assignValuesFormCompanyPosition(): void {
    this.id.setValue(this.companyPosition.id);
    this.name.setValue(this.companyPosition.name);
    this.description.setValue(this.companyPosition.description);
    this.status.setValue(this.companyPosition.status);
  }

  getUpdate(): void {
    this.txtLoad = this.initialState.txtLoad;
    this.getIdToParameterFromUrl();
    this.loadPage = false;
    this.companyPositionService.editShowCompanyPositions(this.idCompanyPosition).subscribe(
      resp => {
        this.companyPosition = resp;
        this.assignValuesFormCompanyPosition();
      },
      () => {
        this.toastr.error('Consulte con el Administrador', 'Error al mostrar el formulario para Actualizar el CARGO');
        this.router.navigate(['administration/companies-positions/index']);
      }
    ).add(
      () => this.loadPage = true
    );
  }

  saveFormCompanyPosition(): void {
    if (this.formCompanyPosition.valid) {
      this.loadPage = false;
      if (!this.id.value) {
        this.storeForm();
      } else {
        this.updateForm();
      }
    }
  }

  storeForm(): void {
    this.txtLoad = 'Guardando Cargo';
    this.companyPositionService.storeCompanyPositions(this.formCompanyPosition.value).subscribe(
      resp => {
        this.resetFormCompanyPosition();
        this.toastr.success(resp.name.toUpperCase(), 'CARGO Creado Correctamente');
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al crear: CARGO.')
    ).add(
      () => this.loadPage = true
    );
  }

  updateForm(): void {
    this.txtLoad = 'Actualizando Cargo';
    this.companyPositionService.updateCompanyPositions(this.formCompanyPosition.value).subscribe(
      resp => {
        this.toastr.success(resp.name.toUpperCase(), 'CARGO Actualizado Correctamente');
        this.router.navigate(['administration/companies-positions/index']);
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: CARGO.'),
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
      params => this.idCompanyPosition = parseInt(params.get('id'))
    );

  }

  resetFormCompanyPosition(): void {
    this.formCompanyPosition.reset();
    this.status.setValue(1);
  }

  ngOnDestroy() {
    if (this.initialState.type == UPDATE) {
      this.gralService.changeDisabled(true);
    }
  }
}
