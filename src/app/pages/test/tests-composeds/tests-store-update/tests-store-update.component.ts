import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { TestComposed } from 'src/app/models/test-composed.model';
import { Study } from 'src/app/models/study.model';
import { StudyService } from 'src/app/services/study/study.service';
import { ToastrService } from 'ngx-toastr';
import { TestComposedService } from '../../../../services/test-composed/test-composed.service';
import { ValidationsNameDirective } from '../../../../directives/validations-name.directive';
import { ValidatorsGlobal } from '../../../../validators/validators-global';
@Component({
  selector: 'app-tests-store-update',
  templateUrl: './tests-store-update.component.html',
  styles: [],
  providers: [ ValidationsNameDirective ]
})
export class TestsStoreUpdateComponent implements OnInit {

  studiesDB: Study[] = []; // Lista de estudios de la base de datos
  formTest: FormGroup; 

  loadStudy: boolean = false; // Bandera para determinar la carga de la lista de Estudios para el formulario de Prueba
  btnStoreUpdate: string; // Texto del botón Guardar o Actualizar, según sea 'store' o 'update'
  
  loadTest: boolean = true; // Bandera para determinar la carga de la sección: Prueba funcion en edit
  txtLoad: string; // Texto de mensaje de carga de la sección

  initialState: {
    btnStoreUpdate: string,
    type: string
  }; // Estado inicial del componente para Guardar o Actualizar recursos, 'store' o 'update'.

  @Output() disabledTabTest: EventEmitter<any> = new EventEmitter<any>();

  @Output() activeTabTest: EventEmitter<any> = new EventEmitter<any>();

  test: TestComposed = new TestComposed;
  constructor(private studyService: StudyService,
    private toastr: ToastrService,
    private validationsDirective: ValidationsNameDirective,
    private testComposedService: TestComposedService) {
    }

  ngOnInit() {
    this.formTest = this.formGroupTest();
    this.loadTestComposedForm();
  }

  formGroupTest(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', {
        validators: [ Validators.required, Validators.maxLength(100) ],
        asyncValidators: [ this.validationsDirective.validateUniqueTest.bind(this.validationsDirective) ] 
      }),
      price: new FormControl(0, [ Validators.required, ValidatorsGlobal.valueMin(0) ]),
      study_id: new FormControl(null, [ Validators.required ]),
      status: new FormControl(1)
    });
  }

  assignValuesFormTest(): void {
    this.test = this.testComposedService.testComposed;
    this.id.setValue(this.test.id);
    this.name.setValue(this.test.name);
    this.price.setValue(this.test.price);
    this.study_id.setValue(this.test.study_id);
    this.status.setValue(this.test.status);
  }

  loadTestComposedForm(): void {
    this.loadStudy = false;
    this.studyService.listStudies().subscribe(
      resp => this.studiesDB = resp,
      ()  => this.toastr.error('Consulte con el Administrador', 'Error al Cargar los ESTUDIOS.')
    ).add(
      () => this.loadStudy = true
    );
  }


  get id() { return this.formTest.get('id'); }
  get name() { return this.formTest.get('name'); }
  get price() { return this.formTest.get('price'); }
  get study_id() { return this.formTest.get('study_id'); }
  get status() { return this.formTest.get('status'); }
  
  validation(formControl: AbstractControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  saveFormTest(): void {
    if(this.formTest.valid) {
      this.loadTest = false;
      if(!this.id.value) {
        this.storeForm();
      } else {
        this.updateForm();
      }
    }
  }

  storeForm(): void {
    this.txtLoad = 'Guardando Prueba';
    this.testComposedService.storeTests(this.formTest.value).subscribe(
      resp => {
        this.toastr.success(resp.name.toUpperCase(), 'PRUEBA creada correctamente');
        this.testComposedService.changeIdNameTestSelected(resp.id,resp.name);
        this.disabledTabTest.emit();
      },
      () => this.toastr.error('Consulte con el Administrador', 'Error al crear: PRUEBA.')
    ).add(
      () => this.loadTest = true
    );
  }

  updateForm(): void {
    this.txtLoad = 'Actualizando Prueba';
    this.testComposedService.updateTests(this.formTest.value).subscribe(
      resp => {
        this.toastr.success(resp.name.toUpperCase(), 'PRUEBA Actualizada Correctamente');
        this.testComposedService.changeIdNameTestSelected(resp.id,resp.name);
        this.activeTabTest.emit();
      },
      () => this.toastr.error('Consulte con el Administrador', 'Error al actualizar: PRUEBA')
    ).add(
      () => this.loadTest = true
    );
  }

  resetFormTest(): void {
    this.formTest.reset();
    this.status.setValue(1);
  }
}
