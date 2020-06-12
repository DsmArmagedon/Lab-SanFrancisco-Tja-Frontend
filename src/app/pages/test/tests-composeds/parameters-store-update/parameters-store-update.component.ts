import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TYPE_DATA, OBJECT_TYPE_DATA } from '../../../../global-variables';
import { UnitService } from '../../../../services/unit/unit.service';
import { Unit } from 'src/app/models/unit.model';
import { ToastrService } from 'ngx-toastr';
import { Title } from 'src/app/models/title.model';
import { TitleService } from '../../../../services/test-composed/title.service';
import { GeneralService } from 'src/app/services/common/general.service';

@Component({
  selector: 'app-parameters-store-update',
  templateUrl: './parameters-store-update.component.html',
  styles: []
})
export class ParametersStoreUpdateComponent implements OnInit {
  formParameter: FormGroup;

  optionModal: boolean;
  txtLoad: string;
  loadPage: boolean = true;
  btnStoreUpdate: string;
  titleModal: string = '';
  idTitle: number;
  nameTitle: string;
  idTest: number;

  optionsDB: Array<string> = [];

  typeDataDB: any = TYPE_DATA;

  loadUnits: boolean;
  unitsDB: Unit[] = [];

  loadTitles: boolean;
  titlesDB: Title[] = [];

  constructor(public bsModalRef: BsModalRef,
    private unitService: UnitService,
    private titleService: TitleService,
    private toastr: ToastrService,
    public gralService: GeneralService) { }

  ngOnInit() {
    this.formParameter = this.formGroupParameter();
    this.loadUnitsForm();
    this.loadTitlesForm();
    this.selectedTitleForShowForm();
  }

  get id() { return this.formParameter.get('id'); }
  get name() { return this.formParameter.get('name'); }
  get unit_id() { return this.formParameter.get('unit_id'); }
  get title_test_id() { return this.formParameter.get('title_test_id'); }
  get type_data() { return this.formParameter.get('type_data'); }
  get reference_values() { return this.formParameter.get('reference_values'); }
  get options() { return this.formParameter.get('options'); }
  get default_value() { return this.formParameter.get('default_value'); }
  get status() { return this.formParameter.get('status'); }

  formGroupParameter() {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl(''),
      unit_id: new FormControl(null),
      title_test_id: new FormControl(null),
      type_data: new FormControl('texto'),
      reference_values: new FormControl(null),
      options: new FormControl([], [Validators.required]),
      default_value: new FormControl(null),
      status: new FormControl(1)
    })
  }

  selectedTitleForShowForm(): void {
    if (this.idTitle !== undefined) {
      this.title_test_id.setValue(this.idTitle);
    }
  }

  saveFormParameter(): void {
    console.log(this.default_value);
    console.log(this.default_value.value);
  }

  onAddOption(event: any) {
    this.optionsDB.push(event.value);
    this.isDisabledDefaultValue();
  }

  onRemoveOption(event: string) {
    this.optionsDB = this.removeItemsFromArray(this.optionsDB, event);
    this.isDisabledDefaultValue();
  }


  removeItemsFromArray(itemsFromArray: Array<string>, item: string): Array<string> {
    return itemsFromArray.filter(e => e !== item);
  }

  isDisabledDefaultValue(): void {
    if (this.optionsDB.length == 0) {
      this.default_value.disable();
    } else {
      this.default_value.enable();
    }
  }

  loadUnitsForm(): void {
    this.loadUnits = false;
    this.unitService.listUnits().subscribe(
      resp => this.unitsDB = resp,
      () => this.toastr.error('Consulte con el Administrador', 'Error al cargar las UNIDADES DE MEDIDA')
    ).add(
      () => this.loadUnits = true
    );
  }

  loadTitlesForm(): void {
    this.loadTitles = false;
    this.titleService.listTitles(this.idTest).subscribe(
      resp => {
        this.titlesDB = resp;
        this.titlesDB.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        })
      },
      () => this.toastr.error('Consulte con el Administrador', 'Error al cargar los TÍTULOS')
    ).add(
      () => this.loadTitles = true
    );
  }

  resetDefaultValue(event: any): void {
    switch (event.id) {
      case OBJECT_TYPE_DATA.numerico:
      case OBJECT_TYPE_DATA.parrafo:
      case OBJECT_TYPE_DATA.texto:
        this.default_value.setValue('');
        break;
      case OBJECT_TYPE_DATA.opciones:
        this.default_value.setValue(null);
        break;
    }
  }
}
