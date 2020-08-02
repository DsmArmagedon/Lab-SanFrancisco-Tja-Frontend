import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { TestComposedService } from '../../../../services/test-composed/test-composed.service';
import { STORE, UPDATE } from '../../../../global-variables';
import { ActivatedRoute, Router } from '@angular/router';
import { TitlesIndexComponent } from '../titles-index/titles-index.component';
import { GeneralService } from 'src/app/services/common/general.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationsNameDirective } from 'src/app/directives/validations-name.directive';
import { ValidatorsGlobal } from 'src/app/validators/validators-global';
import { Study } from 'src/app/models/study/study.model';
import { TestComposed } from 'src/app/models/test-simple-composed/test-composed.model';
import { StudyService } from 'src/app/services/study/study.service';
import { ValidatorsPattern } from 'src/app/validators/validators-pattern';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tests-composeds-store-update',
  templateUrl: './tests-composeds-store-update.component.html',
  styles: [],
  providers: [ValidationsNameDirective]
})
export class TestsComposedsStoreUpdateComponent implements OnInit, OnDestroy {

  @ViewChild('tabsTestComposed', { static: true }) tabsTestComposed: TabsetComponent;
  @ViewChild(TitlesIndexComponent, { static: true }) titleIndexComponent: TitlesIndexComponent;

  studiesDB: Array<Study> = []; // Lista de estudios de la base de datos
  formTest: FormGroup;

  loadStudy: boolean = false; // Bandera para determinar la carga de la lista de Estudios para el formulario de Prueba

  loadTestComposed: boolean = true; // Bandera para determinar la carga de la sección: Prueba funcion en edit
  txtStatusSecTestComposed: string; // Texto de mensaje de carga de la sección

  idTestComposed: number;

  test: TestComposed = new TestComposed;

  initialState: {
    title: string,
    type: string,
    btnStoreUpdate: string
  };

  private onDestroy = new Subject();

  constructor(private testComposedService: TestComposedService,
    private route: ActivatedRoute,
    public gralService: GeneralService,
    private validationsDirective: ValidationsNameDirective,
    private studyService: StudyService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.initialState = this.gralService.getDataInitialState(this.route);
    this.formTest = this.formGroupTest();
    this.loadStudiesForm();
    this.titleIndexComponent.type = this.initialState.type;
    this.selectTypeFormStoreOrUpdate();
  }

  formGroupTest(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100), ValidatorsPattern.alphaNumericSpacePattern],
        asyncValidators: [this.validationsDirective.validateUniqueTest()]
      }),
      price: new FormControl(0, [Validators.required, ValidatorsGlobal.valueMin(0)]),
      study_id: new FormControl(null, [Validators.required]),
      status: new FormControl(1)
    },
      {
        updateOn: 'blur'
      });
  }

  assignValuesFormTest(): void {

    this.id.setValue(this.testComposedService.testComposed.id);
    this.name.setValue(this.testComposedService.testComposed.name);
    this.price.setValue(this.testComposedService.testComposed.price);
    this.study_id.setValue(this.testComposedService.testComposed.study_id);
    this.status.setValue(this.testComposedService.testComposed.status);
  }

  changeTab() {
    this.assignValuesFormTest();
  }

  loadStudiesForm(): void {
    this.loadStudy = false;
    this.studyService.listStudies()
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadStudy = true)
      ).subscribe(
        resp => this.studiesDB = resp,
        () => this.toastr.error('Consulte con el Administrador', 'Error al Cargar los ESTUDIOS.')
      );
  }

  get id() { return this.formTest.get('id'); }
  get name() { return this.formTest.get('name'); }
  get price() { return this.formTest.get('price'); }
  get study_id() { return this.formTest.get('study_id'); }
  get status() { return this.formTest.get('status'); }

  getUpdate(): void {
    this.getIdToParameterFromUrl();
    this.loadTestComposed = false;
    this.txtStatusSecTestComposed = 'Cargando Prueba';

    this.titleIndexComponent.loadTitles = false;
    this.testComposedService.editTests(this.idTestComposed)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadTestComposed = true)
      )
      .subscribe(
        resp => {
          this.testComposedService.testComposed = resp;
          this.addIfStudyIsFalse();
          this.assignValuesFormTest();
          this.loadTestComposed = true;

          this.testComposedService.changeIdNameTestSelected(resp.id, resp.name); // Habilitar los botones de agregar y actualizar de listar títulos.
          this.titleIndexComponent.loadTitles = this.loadTestComposed;
          this.titleIndexComponent.loadListTitles();
        },
        () => this.toastr.error('Consulte con el Administrador', 'Error al mostrar el formulario para Actualizar la Prueba')
      );
  }

  addIfStudyIsFalse(): void {
    !this.testComposedService.testComposed.study.status && this.studiesDB.push(this.testComposedService.testComposed.study);
  }

  saveFormTest(): void {
    if (this.formTest.valid) {
      this.test = Object.assign(new TestComposed, this.formTest.value);
      this.loadTestComposed = false;
      (!this.id.value) ? this.storeForm() : this.updateForm();
    }
  }

  storeForm(): void {
    this.txtStatusSecTestComposed = 'Guardando Prueba';
    this.testComposedService.storeTests(this.test)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadTestComposed = true)
      ).subscribe(
        resp => {
          this.toastr.success(resp.name.toUpperCase(), 'PRUEBA Creada correctamente');
          this.testComposedService.changeIdNameTestSelected(resp.id, resp.name);
          this.disabledTabTest();
        },
        () => this.toastr.error('Consulte con el Administrador', 'Error al crear: PRUEBA')
      );
  }

  updateForm(): void {
    this.txtStatusSecTestComposed = 'Actualizando Prueba';
    this.testComposedService.updateTests(this.test)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadTestComposed = true)
      )
      .subscribe(
        resp => {
          this.toastr.success(resp.name.toUpperCase(), 'PRUEBA Actualizada Correctamente');
          this.testComposedService.testComposed.name = resp.name;
          this.testComposedService.testComposed.study_id = resp.study_id;
          this.testComposedService.testComposed.price = resp.price;
          this.testComposedService.testComposed.status = resp.status;
          this.testComposedService.changeIdNameTestSelected(resp.id, resp.name);
          this.activeTabTest();
        },
        () => this.toastr.error('Consulte con el Administrador', 'Error al actualizar: PRUEBA')
      );
  }

  disabledTabTest(): void {
    this.tabsTestComposed.tabs[0].disabled = true;
    this.tabsTestComposed.tabs[1].disabled = false;
    this.tabsTestComposed.tabs[1].active = true;
  }

  activeTabTest(): void {
    this.tabsTestComposed.tabs[1].active = true;
  }

  resetFormTestComposed(): void {
    this.tabsTestComposed.tabs[1].disabled = true;
    this.tabsTestComposed.tabs[0].disabled = false;
    this.tabsTestComposed.tabs[0].active = true;
    this.resetFormTest();
  }
  ngOnDestroy() {
    if (this.initialState.type == UPDATE) this.gralService.changeDisabled(true);
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  selectTypeFormStoreOrUpdate(): void {
    switch (this.initialState.type) {
      case STORE:
        this.tabsTestComposed.tabs[1].disabled = true;
        this.gralService.changeSelectBtn(STORE);
        break;
      case UPDATE:
        this.tabsTestComposed.tabs[1].disabled = false;
        this.gralService.changeDisabled(false);
        this.gralService.changeSelectBtn(UPDATE);
        this.getUpdate();
        break;
    }
  }

  getIdToParameterFromUrl(): void {
    this.route.paramMap.subscribe(
      params => this.idTestComposed = parseInt(params.get('id'))
    );
  }

  resetFormTest(): void {
    this.formTest.reset();
    this.status.setValue(1);
  }
}
