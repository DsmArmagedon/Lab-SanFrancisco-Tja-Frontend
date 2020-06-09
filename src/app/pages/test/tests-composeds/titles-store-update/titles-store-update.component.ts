import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Title } from 'src/app/models/title.model';

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

  constructor(public bsModalRef: BsModalRef) { 
    this.optionModal = false;
  }
  
  ngOnInit() {
    this.formTitle = this.formGroupTitle();
  }

  formGroupTitle() {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl(''),
      print: new FormControl(1),
      note: new FormControl(''),
      status: new FormControl(1)
    });
  }

  get id() { return this.formTitle.get('id'); }
  get name() { return this.formTitle.get('name'); }
  get print() { return this.formTitle.get('print'); }
  get note() { return this.formTitle.get('note'); }
  get status() { return this.formTitle.get('status'); }

  saveFormTitle(): void {

  }

  validation(formControl: AbstractControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }
}
