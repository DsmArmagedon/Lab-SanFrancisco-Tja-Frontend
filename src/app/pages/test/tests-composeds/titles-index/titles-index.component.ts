import { TitlesStoreUpdateComponent } from './../titles-store-update/titles-store-update.component';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Title } from 'src/app/models/title/title.model';
import { TestComposedService } from '../../../../services/test-composed/test-composed.service';
import { ParametersIndexComponent } from '../parameters-index/parameters-index.component';
import { STORE, POST } from 'src/app/global-variables';
import { Router } from '@angular/router';
import { TitleService } from '../../../../services/test-composed/title.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/services/common/general.service';
import Swal from 'sweetalert2';
import { SwalService } from 'src/app/services/common/swal.service';
import { TitleCasePipe } from '@angular/common';
import { Subscription, Subject } from 'rxjs';
import { take, takeUntil, finalize } from 'rxjs/operators';


@Component({
  selector: 'app-titles-index',
  templateUrl: './titles-index.component.html',
  styles: []
})
export class TitlesIndexComponent implements OnInit, OnDestroy {
  @ViewChild(ParametersIndexComponent, { static: true }) parameterIndexComponent: ParametersIndexComponent;

  @Output()
  executeResetFormTestComposed: EventEmitter<any> = new EventEmitter<any>();

  loadTitles: boolean = true;
  titles: Array<Title> = [];
  nameTestSelected: string = null;
  idTestSelected: number = null;
  selectedRowIndex: number;
  disabledButtonListParameters: boolean;

  bsModalRef: BsModalRef;

  @Input()
  type: string;

  private onDestroy = new Subject();

  constructor(private testComposedService: TestComposedService,
    private titleService: TitleService,
    private router: Router,
    private titleCase: TitleCasePipe,
    private modalService: BsModalService,
    private gralService: GeneralService,
    private swalService: SwalService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.subUpdatedIndexToResourceFromModal();
    this.subIdNameTestSelect();
  }

  subIdNameTestSelect(): void {
    this.testComposedService.idNameTestSelectedObservable
      .pipe(
        takeUntil(this.onDestroy)
      ).subscribe(
        resp => {
          this.nameTestSelected = resp.name;
          this.idTestSelected = resp.id;
        });
  }

  subUpdatedIndexToResourceFromModal(): void {
    this.titleService.updatedIndexToTitleFromModalObservable
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(
        resp => (resp.kind === POST) ? this.titles.push(resp.title) : this.gralService.updateArray(this.titles, resp.title),
        () => this.toastr.error('Error al Actualizar la lista de TITULOS', 'Por favor, actualice manualmente')
      );
  }

  showParameters(title: Title): void {
    this.selectedRowIndex = title.id;
    this.disabledButtonListParameters = true;
    this.titleService.changeIdNameTitleSelected(title.id, title.name);
  }

  statusLoadParameters(status: boolean): void {
    this.disabledButtonListParameters = status;
  }

  loadListTitles(): void {
    this.titles = this.testComposedService.testComposed.titles;
  }

  indexTitles(): void {
    this.loadTitles = false;
    this.titleService.indexTitles(this.idTestSelected)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadTitles = true)
      ).subscribe(
        resp => this.titles = resp,
        () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los TÍTULOS.')
      );
  }

  finish(): void {
    if (this.type === STORE) {
      this.titles = [];
      this.testComposedService.changeIdNameTestSelected(null, null);
      this.titleService.changeIdNameTitleSelected(null, null);
      this.executeResetFormTestComposed.emit();
    } else {
      this.router.navigate(['/test/tests-composeds/index']);
    }
  }

  storeTitles(): void {
    const initialState: any = {
      titleModal: 'Crear Título',
      idTest: this.idTestSelected,
      nameTest: this.nameTestSelected,
      title: null,
      btnStoreUpdate: 'Guardar'
    }
    this.bsModalRef = this.modalService.show(TitlesStoreUpdateComponent, { initialState: initialState, ignoreBackdropClick: true });
  }

  updateTitles(title: Title): void {
    const initialState: any = {
      titleModal: 'Actualizar Título',
      idTest: this.idTestSelected,
      nameTest: this.nameTestSelected,
      title: title,
      btnStoreUpdate: 'Actualizar'
    }
    this.bsModalRef = this.modalService.show(TitlesStoreUpdateComponent, { initialState: initialState, ignoreBackdropClick: true });
  }

  toUpdateTitles(): void {
    this.indexTitles();
  }

  showTestComplete(): void {
    this.router.navigate(['/test/tests-composeds/show/', this.idTestSelected])
  }

  destroyTitles(id: number, name: string): void {
    let title: string = 'Titulo';
    Swal.fire(
      this.swalService.deleteOptions(this.titleCase.transform(name), title)
    ).then(result => {
      if (result.value) {
        this.swalService.deleteLoad(title);
        this.titleService.destroyTitles(this.idTestSelected, id)
          .pipe(
            takeUntil(this.onDestroy),
            finalize(() => Swal.close())
          )
          .subscribe(
            resp => {
              if (this.selectedRowIndex === id) this.titleService.changeIdNameTitleSelected(null, null);
              this.toastr.success(`${title} ${resp.name.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente`);
              this.gralService.deleteArray(this.titles, id);
            },
            () => this.toastr.error('Consulte con el Administrador.', `Error al eliminar: USUARIO.`)
          );
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
