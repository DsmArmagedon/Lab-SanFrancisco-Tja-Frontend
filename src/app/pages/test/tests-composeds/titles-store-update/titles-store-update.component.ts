import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Title } from 'src/app/models/title/title.model';
import { GeneralService } from 'src/app/services/common/general.service';
import { TitleService } from 'src/app/services/test-composed/title.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationsNameDirective } from 'src/app/directives/validations-name.directive';
import { POST, PUT } from 'src/app/global-variables';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-titles-store-update',
  templateUrl: './titles-store-update.component.html',
  styles: [],
  providers: [ValidationsNameDirective]
})
export class TitlesStoreUpdateComponent implements OnInit, OnDestroy {


  formTitle: FormGroup;

  txtStatusSecTitle: string;
  loadTitle: boolean = true;
  btnStoreUpdate: string;
  titleModal: string;
  title: Title;
  idTest: number = null;
  nameTest: string = '';

  private onDestroy = new Subject();

  constructor(public bsModalRef: BsModalRef,
    private titleService: TitleService,
    private validationsDirective: ValidationsNameDirective,
    public gralService: GeneralService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.formTitle = this.formGroupTitle();
    this.selectTypeFormStoreOrUpdate();
  }


  get id() { return this.formTitle.get('id'); }
  get name() { return this.formTitle.get('name'); }
  get print() { return this.formTitle.get('print'); }
  get note() { return this.formTitle.get('note'); }
  get status() { return this.formTitle.get('status'); }

  formGroupTitle(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100)],
        asyncValidators: [this.validationsDirective.validateUniqueTitle(this.idTest)]
      }),
      print: new FormControl(1),
      note: new FormControl('', Validators.maxLength(255)),
      status: new FormControl(1)
    },
      {
        updateOn: 'blur'
      });
  }

  saveFormTitle(): void {
    this.loadTitle = false;
    if (this.formTitle.valid) {
      this.title = Object.assign(new Title, this.formTitle.value);
      this.title.test_id = this.idTest;
      !this.id.value ? this.storeForm() : this.updateForm();
    }
  }

  storeForm(): void {
    this.txtStatusSecTitle = 'Guardando Título';
    this.titleService.storeTitles(this.title)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadTitle = true)
      )
      .subscribe(
        resp => {
          this.toastr.success(resp.name.toUpperCase(), 'TITULO Creada correctamente');
          this.titleService.addTitleToIndexFromModal(resp, POST);
          this.resetFormTitle();
        },
        () => this.toastr.error('Consulte con el Administrador', 'Error al crear: TITULO')
      );
  }

  updateForm(): void {
    this.txtStatusSecTitle = 'Actualizando Tìtulo';
    this.titleService.updateTitles(this.title)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadTitle = true)
      )
      .subscribe(
        resp => {
          this.toastr.success(resp.name.toUpperCase(), 'TITULO Actualizado correctamente');
          this.titleService.addTitleToIndexFromModal(resp, PUT);
          this.bsModalRef.hide();
        },
        () => this.toastr.error('Consulte con el Administrador', 'Error al actualizar: TITULO')
      );
  }

  selectTypeFormStoreOrUpdate(): void {
    if (this.title) this.assignValuesFormTitle();
  }

  assignValuesFormTitle(): void {
    this.id.setValue(this.title.id);
    this.name.setValue(this.title.name);
    this.print.setValue(this.title.print);
    this.note.setValue(this.title.note);
    this.status.setValue(this.title.status);
  }

  resetFormTitle(): void {
    this.formTitle.reset();
    this.status.setValue(1);
    this.print.setValue(1);
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
