import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Title } from 'src/app/models/title.model';
import { GeneralService } from 'src/app/services/common/general.service';
import { TitleService } from 'src/app/services/test-composed/title.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-titles-store-update',
  templateUrl: './titles-store-update.component.html',
  styles: []
})
export class TitlesStoreUpdateComponent implements OnInit {

  formTitle: FormGroup;

  optionModal: boolean;
  txtLoad: string;
  loadPage: boolean = true;
  btnStoreUpdate: string;
  titleModal: string;
  title: Title = new Title;
  idTest: number = null;
  nameTest: string = '';

  constructor(public bsModalRef: BsModalRef,
    private titleService: TitleService,
    public gralService: GeneralService,
    private toastr: ToastrService) {
    this.optionModal = false;
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
      name: new FormControl(''),
      print: new FormControl(1),
      note: new FormControl(''),
      status: new FormControl(1)
    });
  }

  saveFormTitle(): void {
    this.loadPage = false;
    if (this.formTitle.valid) {
      let titleData: Title = this.formTitle.value;
      if (!this.title) {
        this.storeForm(titleData);
      } else {
        this.updateForm(titleData);
      }
    }
  }

  storeForm(titleData: Title): void {
    this.txtLoad = 'Guardando Título';
    this.titleService.storeTitles(titleData).subscribe(
      resp => {
        this.resetFormTitle();
        this.toastr.success(resp.name.toUpperCase(),)
      }
    );
  }

  updateForm(titleData: Title): void {
    this.txtLoad = 'Actualizando Tìtulo';

  }

  selectTypeFormStoreOrUpdate(): void {
    if (this.title) {
      this.assignValuesFormTitle();
    }
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
  }
}
