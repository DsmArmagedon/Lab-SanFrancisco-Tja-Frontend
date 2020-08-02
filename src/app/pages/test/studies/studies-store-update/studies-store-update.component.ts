import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Study } from 'src/app/models/study/study.model';
import { StudyService } from '../../../../services/study/study.service';
import { ValidationsNameDirective } from '../../../../directives/validations-name.directive';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/services/common/general.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UPDATE, STORE } from 'src/app/global-variables';
import { ValidatorsPattern } from 'src/app/validators/validators-pattern';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-studies-store-update',
  templateUrl: './studies-store-update.component.html',
  styles: [],
  providers: [ValidationsNameDirective]
})
export class StudiesStoreUpdateComponent implements OnInit, OnDestroy {
  formStudy: FormGroup;
  study: Study;
  txtStatusSecStudy: string;
  loadStudy: boolean = true;
  initialState: any;
  idStudy: number;

  private onDestroy = new Subject();

  constructor(private studyService: StudyService,
    private validationsDirective: ValidationsNameDirective,
    private toastr: ToastrService,
    public gralService: GeneralService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.formStudy = this.formGroupStudy();
    this.initialState = this.gralService.getDataInitialState(this.route);
    this.selectTypeFormStoreOrUpdate();
  }

  get id() { return this.formStudy.get('id'); }
  get name() { return this.formStudy.get('name'); }
  get description() { return this.formStudy.get('description'); }
  get status() { return this.formStudy.get('status'); }

  formGroupStudy(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100), ValidatorsPattern.alphaSpacePattern],
        asyncValidators: [this.validationsDirective.validateUniqueStudy()]
      }),
      description: new FormControl('', [Validators.maxLength(255)]),
      status: new FormControl(1)
    },
      {
        updateOn: 'blur'
      });
  }

  assignValuesFormStudy(): void {
    this.id.setValue(this.study.id);
    this.name.setValue(this.study.name);
    this.description.setValue(this.study.description);
    this.status.setValue(this.study.status);
  }

  getUpdate(): void {
    this.txtStatusSecStudy = this.initialState.txtLoad;
    this.getIdToParameterFromUrl();
    this.loadStudy = false;
    this.studyService.editShowStudies(this.idStudy)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadStudy = true)
      )
      .subscribe(
        resp => {
          this.study = resp;
          this.assignValuesFormStudy();
        },
        () => {
          this.toastr.error('Consulte con el Administrador', 'Error al mostrar el formulario para Actualizar el ESTUDIO');
          this.router.navigate(['test/studies/index']);
        }
      );
  }

  saveFormStudy(): void {
    if (this.formStudy.valid) {
      this.study = Object.assign(new Study, this.formStudy.value);
      this.loadStudy = false;
      !this.id.value ? this.storeForm() : this.updateForm();
    }
  }

  storeForm(): void {
    this.txtStatusSecStudy = 'Guardando Estudio';
    this.studyService.storeStudies(this.study)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadStudy = true)
      )
      .subscribe(
        resp => {
          this.resetFormStudy();
          this.toastr.success(resp.name.toUpperCase(), 'ESTUDIO Guardado Correctamente');
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al crear: ESTUDIO.')
      );
  }

  updateForm(): void {
    this.txtStatusSecStudy = 'Actualizando Estudio';
    this.studyService.updateStudies(this.study)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadStudy = true)
      )
      .subscribe(
        resp => {
          this.toastr.success(resp.name.toUpperCase(), 'ESTUDIO Actualizado Correctamente');
          this.router.navigate(['test/studies/index']);
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al actualizar: ESTUDIO.'),
      );
  }

  selectTypeFormStoreOrUpdate(): void {
    switch (this.initialState.type) {
      case STORE:
        this.gralService.changeSelectBtn(STORE);
        break;
      case UPDATE:
        this.gralService.changeDisabled(false);
        this.gralService.changeSelectBtn(UPDATE);
        this.getUpdate();
        break;
    }
  }

  getIdToParameterFromUrl(): void {
    this.route.paramMap.subscribe(
      params => this.idStudy = parseInt(params.get('id'))
    );

  }

  resetFormStudy(): void {
    this.formStudy.reset();
    this.status.setValue(1);
  }

  ngOnDestroy() {
    if (this.initialState.type == UPDATE) this.gralService.changeDisabled(true);
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
