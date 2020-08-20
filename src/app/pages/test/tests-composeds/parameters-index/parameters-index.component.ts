import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Parameter } from 'src/app/models/parameter.model';
import { ParameterService } from 'src/app/services/parameter.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ParametersStoreUpdateComponent } from '../parameters-store-update/parameters-store-update.component';
import { TitleService } from 'src/app/services/title.service';
import { TestComposedService } from 'src/app/services/test-composed.service';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { POST, OBJECT_TYPE_DATA, PUT } from 'src/app/global-variables';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';
import { SwalService } from 'src/app/services/swal.service';
import { TitleCasePipe } from '@angular/common';
import { ParametersShowComponent } from '../parameters-show/parameters-show.component';

@Component({
  selector: 'app-parameters-index',
  templateUrl: './parameters-index.component.html',
  styles: []
})
export class ParametersIndexComponent implements OnInit, OnDestroy {
  @Output() statusLoadParameteres: EventEmitter<boolean> = new EventEmitter<boolean>();
  loadParameters: boolean = true;
  parameters: Array<Parameter> = [];
  idTitleSelected: number = null;
  nameTitleSelected: string = null;
  typeData: string = OBJECT_TYPE_DATA.numerico;
  idTestSelected: number;

  bsModalRef: BsModalRef;

  private onDestroy = new Subject();

  constructor(private parameterService: ParameterService,
    private titleService: TitleService,
    private testComposedService: TestComposedService,
    private gralService: GeneralService,
    private toastr: ToastrService,
    private swalService: SwalService,
    private titleCase: TitleCasePipe,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.subIdNameTitleSelected();
    this.subIdNameTestSelected();
    this.subUpdatedIndexToResourceFromModal();
  }

  subUpdatedIndexToResourceFromModal(): void {
    this.parameterService.updatedIndexToParameterFromModalObservable
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(
        resp => {
          if (resp.kind === POST && this.idTitleSelected === resp.parameter.title_id) {
            this.parameters.push(resp.parameter);
          } else if (resp.kind === PUT && this.idTitleSelected === resp.parameter.title_id) {
            this.gralService.updateArray(this.parameters, resp.parameter);
          } else {
            this.gralService.deleteArray(this.parameters, resp.parameter.id);
          }
        },
        () => this.toastr.info('Error al Actualizar la lista de PARAMETROS', 'Por favor, presione el boton "Actualizar"')
      )
  }


  showParameters(parameter: Parameter): void {
    const initialState: any = {
      parameter: parameter
    }
    this.bsModalRef = this.modalService.show(ParametersShowComponent, { initialState: initialState });
  }

  subIdNameTitleSelected(): void {
    this.titleService.idNameTitleSelectedObservable
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(
        resp => {
          this.nameTitleSelected = resp.name;
          this.idTitleSelected = resp.id;
          (this.idTitleSelected && this.nameTitleSelected) ? this.indexParameters() : this.parameters = [];
        }
      );
  }

  subIdNameTestSelected(): void {
    this.testComposedService.idNameTestSelectedObservable
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(resp => this.idTestSelected = resp.id);
  }

  indexParameters(): void {
    this.loadParameters = false;

    this.parameterService.indexParameters(this.idTitleSelected)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => {
          this.loadParameters = true;
          this.statusLoadParameteres.emit(!this.loadParameters);
        })
      )
      .subscribe(
        resp => this.parameters = resp,
        () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los PARAMETROS.')
      );

  }

  storeParameters(): void {
    const initialState: any = {
      titleModal: 'Crear Parámetro',
      idTitle: this.idTitleSelected,
      nameTitle: this.nameTitleSelected,
      parameter: null,
      btnStoreUpdate: 'Guardar',
      idTest: this.idTestSelected
    }
    this.bsModalRef = this.modalService.show(ParametersStoreUpdateComponent, { initialState: initialState, ignoreBackdropClick: true });
  }

  updateParameters(parameter: Parameter) {
    const initialState: any = {
      titleModal: 'Actualizar Parámetro',
      idTitle: this.idTitleSelected,
      nameTitle: this.nameTitleSelected,
      parameter: parameter,
      btnStoreUpdate: 'Actualizar',
      idTest: this.idTestSelected
    }
    this.bsModalRef = this.modalService.show(ParametersStoreUpdateComponent, { initialState: initialState, ignoreBackdropClick: true });
  }

  normalValuesParameters(): void {

  }

  toUpdateParameters(): void {
    this.indexParameters();
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  destroyParameters(id: number, name: string): void {
    let title: string = 'Parametro';
    Swal.fire(
      this.swalService.deleteOptions(this.titleCase.transform(name), title)
    ).then(result => {
      if (result.value) {
        this.swalService.deleteLoad(title);
        this.parameterService.destroyParameters(this.idTitleSelected, id)
          .pipe(
            takeUntil(this.onDestroy),
            finalize(() => Swal.close())
          )
          .subscribe(
            resp => {
              this.toastr.success(`${title} ${resp.name.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente`);
              this.gralService.deleteArray(this.parameters, id);
            },
            () => this.toastr.error('Consulte con el Administrador.', `Error al eliminar: PARAMETROS.`)
          );
      }
    });

  }
}
