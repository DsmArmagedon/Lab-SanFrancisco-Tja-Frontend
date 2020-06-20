import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { HealthCenter } from 'src/app/models/health-center.model';
import { HealthCentersFilterComponent } from '../health-centers-filter/health-centers-filter.component';
import { Meta } from 'src/app/models/meta.model';
import { HealthCenterService } from '../../../../services/health-center/health-center.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SwalService } from '../../../../services/common/swal.service';
import { GeneralService } from 'src/app/services/common/general.service';
import { INDEX } from 'src/app/global-variables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-health-centers-index',
  templateUrl: './health-centers-index.component.html',
  styles: []
})
export class HealthCentersIndexComponent implements OnInit {
  @ViewChild(HealthCentersFilterComponent, { static: true }) healthCenterFilter: HealthCentersFilterComponent;
  public isCollapsed: boolean = false;
  public currentPage: number;
  selectedRowIndex: number;
  formFilter: FormGroup;
  healthCenters: HealthCenter[] = [];
  perPage: number = 25;
  maxSize: number = 3;
  loadPage: boolean;
  meta: Meta;
  constructor(private healthCenterService: HealthCenterService,
    private toastr: ToastrService,
    private swalService: SwalService,
    public gralService: GeneralService,
    private router: Router) {
    this.meta = new Meta;
    this.gralService.changeSelectBtn(INDEX);
  }

  ngOnInit() {
    this.formFilter = this.healthCenterFilter.formGroupFilter();
    this.indexHealthCenters();
  }

  indexHealthCenters(): void {
    this.loadPage = false;
    this.healthCenterService.indexHealthCenters(this.formFilter.value, this.perPage, this.currentPage).subscribe(
      resp => {
        this.healthCenters = resp.healthCenters;
        this.meta = resp.meta;
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los CENTROS DE SALUD.')
    ).add(
      () => this.loadPage = true
    );
  }

  updateHealthCenters(id: number) {
    this.router.navigate(['administration/health-centers/index', id]);
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
            this.swalService.deleteError(err.status, title);
          }
        );
      }
    })
  }
}
