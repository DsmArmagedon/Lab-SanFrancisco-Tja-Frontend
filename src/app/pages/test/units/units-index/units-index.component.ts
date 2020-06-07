import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Meta } from 'src/app/models/meta.model';
import { Unit } from 'src/app/models/unit.model';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from '../../../../services/swal/swal.service';
import { UnitsFilterComponent } from '../units-filter/units-filter.component';
import { UnitService } from 'src/app/services/unit/unit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-units-index',
  templateUrl: './units-index.component.html',
  styles: []
})
export class UnitsIndexComponent implements OnInit {

  public isCollapsed: boolean = true;
  public currentPage: number;
  selectedRowIndex: number;
  formFilter: FormGroup;
  units: Unit[] = [];
  perPage: number = 25;
  maxSize: number = 3;
  loadPage: boolean;
  meta: Meta;
  
  @ViewChild(UnitsFilterComponent, { static: true }) unitFilter: UnitsFilterComponent;

  constructor(private unitService: UnitService,
              private toastr: ToastrService,
              private swalService: SwalService) {
    this.meta = new Meta;
  }

  ngOnInit() {
    this.formFilter = this.unitFilter.formGroupFilter();
    this.indexUnits();
  }

  indexUnits(): void {
    this.loadPage = false;
    this.unitService.indexUnits(this.formFilter.value, this.perPage, this.currentPage).subscribe(
      resp => {
        this.units = resp.data;
        this.meta = resp.meta;
      },
      () => this.toastr.error('Consulte con el administrador.', 'Error al listar las UNIDADES.')
    ).add(
      () => this.loadPage = true
    );
  }

  changePerPage(): void {
    this.currentPage = 1;
    this.indexUnits();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.indexUnits();
  }

  resetFormFilter(): void {
    this.unitFilter.resetFormFilter();
  }

  filter(event): void {
    this.currentPage = 1;
    this.formFilter = event;
    this.indexUnits();
  }

  updateUnits(unit: Unit): void {
    this.selectedRowIndex = unit.id;
    this.unitService.updateUnitObs(unit);
  }

  destroyUnits(id: number, name: string): void {
    let title: string = 'Unidad de Medida';
    if(id == this.unitService.unitEdit.id) {
      this.toastr.error('Prohibido eliminar la UNIDAD DE MEDIDA, mientras se encuentre en edición, para continuar seleccione Nuevo.', 'Error al eliminar la UNIDAD DE MEDIDA');
      return;
    }
    Swal.fire(
      this.swalService.deleteOptions(name, title)
    ).then((result) => {
      if (result.value) {
        this.swalService.deleteLoad(title);
        this.unitService.destroyUnits(id).subscribe(
          resp => {
            Swal.close();
            this.toastr.success(`${title} ${resp.name.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente.`);
            this.indexUnits();
          },
          err => {
            this.swalService.deleteError(err.status,title);
          }
        );
      }
    })
  }
}
