import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ValidationsNameDirective } from 'src/app/directives/validations-name.directive';
import { GeneralService } from 'src/app/services/general.service';
import { ToastrService } from 'ngx-toastr';
import { finalize, takeUntil } from 'rxjs/operators';
import { POST, PUT } from 'src/app/global-variables';


@Component({
  selector: 'app-categories-store-update',
  templateUrl: './categories-store-update.component.html',
  providers: [ValidationsNameDirective]
})
export class CategoriesStoreUpdateComponent implements OnInit {

  formCategory: FormGroup;

  txtStatusSecCategory: string;
  loadCategory: boolean = true;
  btnStoreUpdate: string;
  titleModal: string;
  category: Category;
  idTest: number = null;
  nameTest: string = '';

  private onDestroy = new Subject();

  constructor(public bsModalRef: BsModalRef,
    private categoryService: CategoryService,
    private validationsDirective: ValidationsNameDirective,
    public gralService: GeneralService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.formCategory = this.formGroupTitle();
    this.selectTypeFormStoreOrUpdate();
  }


  get id() { return this.formCategory.get('id'); }
  get name() { return this.formCategory.get('name'); }
  get print() { return this.formCategory.get('print'); }
  get note() { return this.formCategory.get('note'); }
  get status() { return this.formCategory.get('status'); }

  formGroupTitle(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100)],
        asyncValidators: [this.validationsDirective.validateUniqueCategory(this.idTest)]
      }),
      print: new FormControl(1),
      note: new FormControl('', Validators.maxLength(255)),
      status: new FormControl(1)
    },
      {
        updateOn: 'blur'
      });
  }

  saveFormCategory(): void {
    this.loadCategory = false;
    if (this.formCategory.valid) {
      this.category = new Category(this.formCategory.value);
      this.category.test_id = this.idTest;
      !this.id.value ? this.storeForm() : this.updateForm();
    }
  }

  storeForm(): void {
    this.txtStatusSecCategory = 'Guardando Categoría';
    this.categoryService.storeCategories(this.category)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadCategory = false)
      )
      .subscribe(
        resp => {
          this.toastr.success(resp.name.toUpperCase(), 'CATEGORÍA Creada correctamente');
          this.categoryService.addCategoryToIndexFromModal(resp, POST);
          this.resetformCategory();
        },
        () => this.toastr.error('Consulte con el Administrador', 'Error al crear: CATEGORÍA')
      );
  }

  updateForm(): void {
    this.txtStatusSecCategory = 'Actualizando Categoría';
    this.categoryService.updateCategories(this.category)
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(
        resp => {
          this.toastr.success(resp.name.toUpperCase(), 'CATEGORÍA Actualizado correctamente');
          this.categoryService.addCategoryToIndexFromModal(resp, PUT);
          this.bsModalRef.hide();
        },
        () => this.toastr.error('Consulte con el Administrador', 'Error al actualizar: CATEGORÍA')
      )
  }

  selectTypeFormStoreOrUpdate(): void {
    if (this.category) this.assignValuesformCategory();
  }

  assignValuesformCategory(): void {
    this.id.setValue(this.category.id);
    this.name.setValue(this.category.name);
    this.print.setValue(this.category.print);
    this.note.setValue(this.category.note);
    this.status.setValue(this.category.status);
  }

  resetformCategory(): void {
    this.formCategory.reset();
    this.status.setValue(1);
    this.print.setValue(1);
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

}
