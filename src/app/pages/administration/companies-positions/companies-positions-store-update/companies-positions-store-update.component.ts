import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CompanyPositionService } from '../../../../services/company-position/company-position.service';
import { CompanyPosition } from 'src/app/models/company-position.model';
import { ValidatorsPattern } from '../../../../validators/validators-pattern';
import { ValidationsNameDirective } from '../../../../directives/validations-name.directive';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/services/common/general.service';

@Component({
  selector: 'app-companies-positions-store-update',
  templateUrl: './companies-positions-store-update.component.html',
  providers: [ ValidationsNameDirective ]
})
export class CompaniesPositionsStoreUpdateComponent implements OnInit {
  @Output() executeIndex: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectRowIndexNull: EventEmitter<any> = new EventEmitter<any>();
  formCompanyPosition: FormGroup;
  txtLoad: string;
  loadPage: boolean = true;
  loadPageStoreUpdate: boolean = true;
  companyPosition: CompanyPosition;
  initialState: any;


  stateStore: any = {
    title: 'Crear Cargo',
    btnStoreUpdate: 'Guardar'
  };

  stateUpdate: any = {
    title: 'Editar Cargo',
    btnStoreUpdate: 'Actualizar'
  }

  constructor(private companyPositionService: CompanyPositionService,
              private validationsDirective: ValidationsNameDirective,
              private toastr: ToastrService,
              public gralService: GeneralService) {
    this.initialState = this.stateStore; 
  }

  ngOnInit() {
    this.formCompanyPosition = this.formGroupCompanyPosition();
    this.companyPositionService.updateCompanyPositionObservable.subscribe(
      resp => {
          this.formCompanyPosition.reset();
          this.companyPosition = resp;
          this.initialState = this.stateUpdate;
          this.assignValuesFormCompanyPosition();
      }
    );
  }

  get id() { return this.formCompanyPosition.get('id'); }
  get name() { return this.formCompanyPosition.get('name'); }
  get description() { return this.formCompanyPosition.get('description') }
  get status() { return this.formCompanyPosition.get('status'); }

  formGroupCompanyPosition(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl('',{
        validators: [ Validators.required, Validators.maxLength(100), ValidatorsPattern.alphaNumericSpacePattern ],
        asyncValidators: [ this.validationsDirective.validateUniqueCompanyPosition.bind(this.validationsDirective) ]
      }),
      description: new FormControl('',{
        validators: [ Validators.maxLength(180) ]
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

  getStore(): void {
    this.initialState = this.stateStore;
    this.companyPositionService.companyPositionEdit = new CompanyPosition;
    this.formCompanyPosition.reset();
    this.status.setValue(1);
    this.selectRowIndexNull.emit();
  }

  saveFormCompanyPosition():void {
    if(this.formCompanyPosition.valid) {
      this.loadPageStoreUpdate = false;
      if(!this.id.value) {
        this.storeForm();    
      } else {
        this.updateForm();
      }
    }
  }

  storeForm():void{
    this.txtLoad = 'Guardando Cargo';
    this.companyPositionService.storeCompanyPositions(this.formCompanyPosition.value).subscribe(
      resp => {
        this.toastr.success(resp.name.toUpperCase(), 'CARGO Creado Correctamente');
        this.executeIndex.emit();
        this.resetFormCompanyPosition();
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al crear: CARGO.')
    ).add(
      () => this.loadPageStoreUpdate = true
    );
  }

  updateForm(): void {
    this.txtLoad = 'Actualizando Cargo';
    this.companyPositionService.updateCompanyPositions(this.formCompanyPosition.value).subscribe(
      resp => {
        this.executeIndex.emit();
        this.selectRowIndexNull.emit();
        this.resetFormCompanyPosition();
        this.toastr.success(resp.name.toUpperCase(), 'CARGO Actualizado Correctamente');
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: CARGO.'),
    ).add(
      () => this.loadPageStoreUpdate = true
    );
  }

  resetFormCompanyPosition(): void {
    this.formCompanyPosition.reset();
    this.status.setValue(1);
  }
}
 