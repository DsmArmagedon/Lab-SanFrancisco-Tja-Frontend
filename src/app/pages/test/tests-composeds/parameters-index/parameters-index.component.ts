import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Parameter } from 'src/app/models/parameter.model';
import { ParameterService } from 'src/app/services/parameter.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ParametersStoreUpdateComponent } from '../parameters-store-update/parameters-store-update.component';
import { CategoryService } from 'src/app/services/category.service';
import { TestComposedService } from 'src/app/services/test-composed.service';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { POST, PUT, TypeData } from 'src/app/global-variables';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';
import { SwalService } from 'src/app/services/swal.service';
import { TitleCasePipe } from '@angular/common';
import { ParametersShowComponent } from '../parameters-show/parameters-show.component';
import { NormalValuesComponent } from '../../normal-values/normal-values.component';

@Component({
  selector: 'app-parameters-index',
  templateUrl: './parameters-index.component.html',
  styles: []
})
export class ParametersIndexComponent implements OnInit, OnDestroy {
  @Output() statusLoadParameteres: EventEmitter<boolean> = new EventEmitter<boolean>();
  loadParameters: boolean = true;
  parameters: Array<Parameter> = [];
  idCategorySelected: number = null;
  nameCategorySelected: string = null;
  typeDataNumeric: string = TypeData.NUMERIC;
  idTestSelected: number;

  private onDestroy = new Subject();

  constructor(private parameterService: ParameterService,
    private categoryService: CategoryService,
    private testComposedService: TestComposedService,
    private gralService: GeneralService,
    private toastr: ToastrService,
    private swalService: SwalService,
    private titleCase: TitleCasePipe,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.subIdNameCategorySelected();
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
          if (resp.kind === POST && this.idCategorySelected === resp.parameter.category_id) {
            this.parameters.push(resp.parameter);
          } else if (resp.kind === PUT && this.idCategorySelected === resp.parameter.category_id) {
            this.gralService.updateArray(this.parameters, resp.parameter);
          } else {
            this.gralService.deleteArray(this.parameters, resp.parameter.id);
          }
        },
        () => this.toastr.info('Error al Actualizar la lista de PARÁMETROS', 'Por favor, presione el boton "Actualizar"')
      )
  }


  showParameters(parameter: Parameter): void {
    const initialState: any = {
      parameter: parameter
    }
    this.modalService.show(ParametersShowComponent, { initialState: initialState });
  }

  subIdNameCategorySelected(): void {
    this.categoryService.idNameCategorySelectedObservable
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(
        resp => {
          this.nameCategorySelected = resp.name;
          this.idCategorySelected = resp.id;
          (this.idCategorySelected && this.nameCategorySelected) ? this.indexParameters() : this.parameters = [];
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

    this.parameterService.indexParameters(this.idCategorySelected)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => {
          this.loadParameters = true;
          this.statusLoadParameteres.emit(!this.loadParameters);
        })
      )
      .subscribe(
        resp => this.parameters = resp,
        () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los PARÁMETROS.')
      );

  }

  storeParameters(): void {
    const initialState: any = {
      titleModal: 'Crear Parámetro',
      idCategory: this.idCategorySelected,
      nameCategory: this.nameCategorySelected,
      parameter: null,
      btnStoreUpdate: 'Guardar',
      idTest: this.idTestSelected
    }
    this.modalService.show(ParametersStoreUpdateComponent, { initialState: initialState, ignoreBackdropClick: true });
  }

  updateParameters(parameter: Parameter) {
    const initialState: any = {
      titleModal: 'Actualizar Parámetro',
      idCategory: this.idCategorySelected,
      nameCategory: this.nameCategorySelected,
      parameter: parameter,
      btnStoreUpdate: 'Actualizar',
      idTest: this.idTestSelected
    }
    this.modalService.show(ParametersStoreUpdateComponent, { initialState: initialState, ignoreBackdropClick: true });
  }

  normalValuesParameters(): void {
    this.modalService.show(NormalValuesComponent, { ignoreBackdropClick: true, class: 'modal-lg' });
  }

  toUpdateParameters(): void {
    this.indexParameters();
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  destroyParameters(id: number, name: string): void {
    let title: string = 'Parámetro';
    Swal.fire(
      this.swalService.deleteOptions(this.titleCase.transform(name), title)
    ).then(result => {
      if (result.value) {
        this.swalService.deleteLoad(title);
        this.parameterService.destroyParameters(this.idCategorySelected, id)
          .pipe(
            takeUntil(this.onDestroy),
            finalize(() => Swal.close())
          )
          .subscribe(
            resp => {
              this.toastr.success(resp.name.toUpperCase(), `${title.toUpperCase()} Eliminado Correctamente`);
              this.gralService.deleteArray(this.parameters, id);
            },
            () => this.toastr.error('Consulte con el Administrador.', `Error al eliminar: PARÁMETROS.`)
          );
      }
    });

  }
}
