import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { GeneralService } from 'src/app/services/general.service';
import { CategoryService } from 'src/app/services/category.service';
import { SwalService } from 'src/app/services/swal.service';
import { TestComposedService } from 'src/app/services/test-composed.service';
import { ParametersIndexComponent } from '../parameters-index/parameters-index.component';
import { finalize, takeUntil } from 'rxjs/operators';
import { POST, STORE } from 'src/app/global-variables';
import Swal from 'sweetalert2';
import { CategoriesStoreUpdateComponent } from '../categories-store-update/categories-store-update.component';

@Component({
  selector: 'app-categories-index',
  templateUrl: './categories-index.component.html'
})
export class CategoriesIndexComponent implements OnInit {

  @ViewChild(ParametersIndexComponent, { static: true }) parameterIndexComponent: ParametersIndexComponent;

  @Output()
  executeResetFormTestComposed: EventEmitter<any> = new EventEmitter<any>();

  loadCategories: boolean = true;
  categories: Array<Category> = [];
  nameTestSelected: string = null;
  idTestSelected: number = null;
  selectedRowIndex: number;
  disabledButtonListParameters: boolean;

  bsModalRef: BsModalRef;

  @Input()
  type: string;

  private onDestroy = new Subject();

  constructor(private testComposedService: TestComposedService,
    private categoryService: CategoryService,
    private router: Router,
    private titleCase: TitleCasePipe,
    private modalService: BsModalService,
    private gralService: GeneralService,
    private swalService: SwalService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
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
    this.categoryService.updatedIndexToCategoryFromModalObservable
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(
        resp => (resp.kind === POST) ? this.categories.push(resp.category) : this.gralService.updateArray(this.categories, resp.category),
        () => this.toastr.error('Error al Actualizar la lista de CATEGORÍAS', 'Por favor, actualice manualmente')
      );
  }

  showParameters(category: Category): void {
    this.selectedRowIndex = category.id;
    this.disabledButtonListParameters = true;
    this.categoryService.changeIdNameCategorySelected(category.id, category.name);
  }

  statusLoadParameters(status: boolean): void {
    this.disabledButtonListParameters = status;
  }

  loadListCategories(): void {
    this.categories = this.testComposedService.testComposed.categories;
  }

  indexCategories(): void {
    this.loadCategories = false;
    this.categoryService.indexCategories(this.idTestSelected)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadCategories = true)
      ).subscribe(
        resp => this.categories = resp,
        () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los CATEGORÍAS.')
      );
  }

  finish(): void {
    if (this.type === STORE) {
      this.categories = [];
      this.testComposedService.changeIdNameTestSelected(null, null);
      this.categoryService.changeIdNameCategorySelected(null, null);
      this.executeResetFormTestComposed.emit();
    } else {
      this.router.navigate(['/test/tests-composed/index']);
    }
  }

  storeCategories(): void {
    const initialState: any = {
      titleModal: 'Crear Categoría',
      idTest: this.idTestSelected,
      nameTest: this.nameTestSelected,
      category: null,
      btnStoreUpdate: 'Guardar'
    }
    this.bsModalRef = this.modalService.show(CategoriesStoreUpdateComponent, { initialState: initialState, ignoreBackdropClick: true });
  }

  updateCategories(category: Category): void {
    const initialState: any = {
      titleModal: 'Actualizar Categoría',
      idTest: this.idTestSelected,
      nameTest: this.nameTestSelected,
      category: category,
      btnStoreUpdate: 'Actualizar'
    }
    this.bsModalRef = this.modalService.show(CategoriesStoreUpdateComponent, { initialState: initialState, ignoreBackdropClick: true });
  }

  toUpdateCategories(): void {
    this.indexCategories();
  }

  showTestComplete(): void {
    this.router.navigate(['/test/tests-composed/show/', this.idTestSelected])
  }

  destroyCategories(id: number, name: string): void {
    let title: string = 'Categoría';
    Swal.fire(
      this.swalService.deleteOptions(this.titleCase.transform(name), title)
    ).then(result => {
      if (result.value) {
        this.swalService.deleteLoad(title);
        this.categoryService.destroyCategories(this.idTestSelected, id)
          .pipe(
            takeUntil(this.onDestroy),
            finalize(() => Swal.close())
          )
          .subscribe(
            resp => {
              if (this.selectedRowIndex === id) this.categoryService.changeIdNameCategorySelected(null, null);
              this.toastr.success(resp.name.toUpperCase(), `${title.toUpperCase()} Eliminado Correctamente`);
              this.gralService.deleteArray(this.categories, id);
            },
            (e) => console.log(e)
            // () => this.toastr.error('Consulte con el Administrador.', `Error al eliminar: USUARIO.`)
          );
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
