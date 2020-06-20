import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Meta } from 'src/app/models/meta.model';
import { Unit } from 'src/app/models/unit.model';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from '../../../../services/common/swal.service';
import { UnitsFilterComponent } from '../units-filter/units-filter.component';
import { UnitService } from 'src/app/services/unit/unit.service';
import Swal from 'sweetalert2';
import { GeneralService } from 'src/app/services/common/general.service';
import { INDEX } from 'src/app/global-variables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-units-index',
  templateUrl: './units-index.component.html',
  styles: []
})
export class UnitsIndexComponent implements OnInit {

  public isCollapsed: boolean = false;
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
    private swalService: SwalService,
    public gralService: GeneralService,
    private router: Router) {
    this.meta = new Meta;
    this.gralService.changeSelectBtn(INDEX);
  }

  ngOnInit() {
    this.formFilter = this.unitFilter.formGroupFilter();
    this.indexUnits();
  }

  indexUnits(): void {
    this.loadPage = false;
    this.unitService.indexUnits(this.formFilter.value, this.perPage, this.currentPage).subscribe(
      resp => {
        this.units = resp.units;
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

  updateUnits(id: number): void {
    this.router.navigate(['test/units/update', id]);
  }

  destroyUnits(id: number, name: string): void {
    let title: string = 'Unidad de Medida';
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
            this.swalService.deleteError(err.status, title);
          }
        );
      }
    })
  }
}
