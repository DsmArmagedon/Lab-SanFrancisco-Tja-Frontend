import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Study } from 'src/app/models/study.model';
import { StudyService } from '../../../../services/study/study.service';
import { ValidationsNameDirective } from '../../../../directives/validations-name.directive';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-studies-store-update',
  templateUrl: './studies-store-update.component.html',
  styles: [],
  providers: [ ValidationsNameDirective ]
})
export class StudiesStoreUpdateComponent implements OnInit {
  @Output() executeIndex: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectRowIndexNull: EventEmitter<any> = new EventEmitter<any>();
  formStudy: FormGroup;
  study: Study;
  txtLoad: string;
  loadPage: boolean = true;
  loadPageStoreUpdate: boolean = true;

  stateStore: any = {
    title: 'Crear Estudio',
    btnStoreUpdate: 'Guardar'
  }

  stateUpdate: any = {
    title: 'Editar Estudio',
    btnStoreUpdate: 'Actualizar'
  }

  initialState: any;
  constructor(private studyService: StudyService,
              private validationsDirective: ValidationsNameDirective,
              private toastr: ToastrService) {
    this.initialState = this.stateStore;
  }

  ngOnInit() {
    this.formStudy = this.formGroupStudy();
    this.studyService.editStudyObservable.subscribe(
      resp => {
        this.formStudy.reset();
        this.study = resp;
        this.initialState = this.stateUpdate;
        this.assignValuesFormStudy()
      }
    );
  }

  assignValuesFormStudy(): void {
    this.id.setValue(this.study.id);
    this.name.setValue(this.study.name);
    this.description.setValue(this.study.description);
    this.status.setValue(this.study.status);
  }
  formGroupStudy(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', {
        validators: [ Validators.required, Validators.maxLength(100) ],
        asyncValidators: [ this.validationsDirective.validateUniqueStudy.bind(this.validationsDirective)]
      }),
      description: new FormControl('', [ Validators.maxLength(180) ]),
      status: new FormControl(1)
    });
  }

  get id() { return this.formStudy.get('id'); }
  get name() { return this.formStudy.get('name'); }
  get description() { return this.formStudy.get('description'); }
  get status() { return this.formStudy.get('status'); }

  validation(formControl: FormControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  saveFormStudy(): void {
    if(this.formStudy.valid) {
      this.loadPageStoreUpdate = false;
      if(!this.id.value) {
        this.storeForm();
      } else {
        this.updateForm();
      }
    }
  }

  storeForm(): void {
    this.txtLoad = 'Guardando Estudio';
    this.studyService.storeStudies(this.formStudy.value).subscribe(
      resp => {
        this.toastr.success(resp.name.toUpperCase(), 'ESTUDIO Actualizado Correctamente');
        this.executeIndex.emit();
        this.resetFormStudy();
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al crear: ESTUDIO.')
    ).add(
      () => this.loadPageStoreUpdate = true
    );
  }

  updateForm(): void {
    this.txtLoad = 'Actualizando Estudio';
    this.studyService.updateStudies(this.formStudy.value).subscribe(
      resp => {
        this.toastr.success(resp.name.toUpperCase(), 'ESTUDIO Actualizado Correctamente');
        this.executeIndex.emit();
        this.selectRowIndexNull.emit();
        this.resetFormStudy();
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: ESTUDIO.'),
    ).add(
      () => this.loadPageStoreUpdate = true
    );
  }

  resetFormStudy(): void {
    this.formStudy.reset();
    this.status.setValue(1);
  }

  getStore(): void {
    this.formStudy.reset();
    this.status.setValue(1);
    this.initialState = this.stateStore;
    this.selectRowIndexNull.emit();
    this.studyService.studyEdit = new Study;
  }
}
