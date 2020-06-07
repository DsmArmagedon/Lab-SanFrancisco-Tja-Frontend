import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { HealthCenter } from 'src/app/models/health-center.model';
import { HealthCentersFilterComponent } from '../health-centers-filter/health-centers-filter.component';
import { Meta } from 'src/app/models/meta.model';
import { HealthCenterService } from '../../../../services/health-center/health-center.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SwalService } from '../../../../services/swal/swal.service';

@Component({
  selector: 'app-health-centers-index',
  templateUrl: './health-centers-index.component.html',
  styles: []
})
export class HealthCentersIndexComponent implements OnInit {
  public isCollapsed: boolean = true;
  public currentPage: number;
  selectedRowIndex: number;
  formFilter: FormGroup;
  healthCenters: HealthCenter[] = [];
  perPage: number = 25;
  maxSize: number = 3;
  loadPage: boolean;
  meta: Meta;
  @ViewChild(HealthCentersFilterComponent, { static: true }) healthCenterFilter: HealthCentersFilterComponent;
  constructor(private healthCenterService: HealthCenterService,
              private toastr: ToastrService,
              private swalService: SwalService) {
    this.meta = new Meta();
  }

  ngOnInit() {
    this.formFilter = this.healthCenterFilter.formGroupFilter();
    this.indexHealthCenters();
  }

  indexHealthCenters(): void {
    this.loadPage = false;
    this.healthCenterService.indexHealthCenters(this.formFilter.value, this.perPage, this.currentPage).subscribe(
      resp => {
        this.healthCenters = resp.data;
        this.meta = resp.meta;
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los CENTROS DE SALUD.')
    ).add(
      () => this.loadPage = true
    );
  }

  updateHealthCenters(healthCenter: HealthCenter) {
    this.selectedRowIndex = healthCenter.id;
    this.healthCenterService.updateHealthCenterObs(healthCenter);
  }

  changePerPage(): void {
    this.currentPage = 1;
    this.indexHealthCenters();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.indexHealthCenters();
  }

  resetFormFilter(): void {
    this.healthCenterFilter.resetFormFilter();
  }

  filter(event): void {
    this.currentPage = 1;
    this.formFilter = event;
    this.indexHealthCenters();
  }

  destroyHealthCenters(id: number, name: string): void {
    let title: string = 'Centro de Salud';
    if (id === this.healthCenterService.healthCenterEdit.id) {
      this.toastr.error('Prohibido eliminar el CENTRO DE SALUD, mientras se encuentre en edición, para continuar seleccione Nuevo.', 'Error al eliminar el CENTRO DE SALUD');
      return;
    }
    Swal.fire(
      this.swalService.deleteOptions(name, title)
    ).then((result) => {
      if (result.value) {
        this.swalService.deleteLoad(title);
        this.healthCenterService.destroyHealthCenters(id).subscribe(
          resp => {
            Swal.close();
            this.toastr.success(`${title} ${resp.name.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente.`);
            this.indexHealthCenters();
          },
          err => {
            this.swalService.deleteError(err.status,title);
          }
        );
      }
    })
  }
}
