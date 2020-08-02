import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HealthCentersFilterComponent } from '../health-centers-filter/health-centers-filter.component';
import { HealthCenterService } from '../../../../services/health-center/health-center.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SwalService } from '../../../../services/common/swal.service';
import { GeneralService } from 'src/app/services/common/general.service';
import { INDEX } from 'src/app/global-variables';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { Meta } from 'src/app/models/custom/meta.model';
import { HealthCenter } from 'src/app/models/health-center/health-center.model';

@Component({
  selector: 'app-health-centers-index',
  templateUrl: './health-centers-index.component.html',
  styles: []
})
export class HealthCentersIndexComponent implements OnInit, OnDestroy {
  @ViewChild(HealthCentersFilterComponent, { static: true }) healthCenterFilter: HealthCentersFilterComponent;
  public isCollapsed: boolean = false;
  public currentPage: number;
  formFilter: FormGroup;
  healthCenters: HealthCenter[] = [];
  perPage: number = 25;
  maxSize: number = 3;
  loadHealthCenters: boolean;
  meta: Meta;

  private onDestroy = new Subject();

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
    this.loadHealthCenters = false;
    this.healthCenterService.indexHealthCenters(this.formFilter.value, this.perPage, this.currentPage)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadHealthCenters = true)
      )
      .subscribe(
        resp => {
          this.healthCenters = resp.healthCenters;
          console.log(this.healthCenters);
          this.meta = resp.meta;
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los CENTROS DE SALUD.')
      )
  }

  updateHealthCenters(id: number) {
    this.router.navigate(['administration/health-centers/update', id]);
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
        this.healthCenterService.destroyHealthCenters(id)
          .pipe(
            takeUntil(this.onDestroy),
            finalize(() => Swal.close())
          ).subscribe(
            resp => {
              this.toastr.success(`${title} ${resp.name.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente.`);
              this.indexHealthCenters();
            },
            () => this.toastr.error('Consulte con el Administrador.', `Error al eliminar: CENTRO DE SALUD.`)
          );
      }
    })
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
