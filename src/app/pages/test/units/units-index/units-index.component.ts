import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from '../../../../services/common/swal.service';
import { UnitsFilterComponent } from '../units-filter/units-filter.component';
import { UnitService } from 'src/app/services/unit/unit.service';
import Swal from 'sweetalert2';
import { GeneralService } from 'src/app/services/common/general.service';
import { INDEX } from 'src/app/global-variables';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { Meta } from 'src/app/models/custom/meta.model';
import { Unit } from 'src/app/models/unit/unit.model';

@Component({
  selector: 'app-units-index',
  templateUrl: './units-index.component.html',
  styles: []
})
export class UnitsIndexComponent implements OnInit, OnDestroy {
  @ViewChild(UnitsFilterComponent, { static: true }) unitFilter: UnitsFilterComponent;

  isCollapsed: boolean = false;
  currentPage: number;
  formFilter: FormGroup;
  units: Unit[] = [];
  perPage: number = 25;
  maxSize: number = 3;
  loadUnits: boolean;
  meta: Meta;

  private onDestroy = new Subject();

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
    this.loadUnits = false;
    this.unitService.indexUnits(this.formFilter.value, this.perPage, this.currentPage)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadUnits = true)
      )
      .subscribe(
        resp => {
          this.units = resp.units;
          this.meta = resp.meta;
        },
        () => this.toastr.error('Consulte con el administrador.', 'Error al listar las UNIDADES.')
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
        this.unitService.destroyUnits(id)
          .pipe(
            takeUntil(this.onDestroy),
            finalize(() => Swal.close())
          )
          .subscribe(
            resp => {
              this.toastr.success(`${title} ${resp.name.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente.`);
              this.indexUnits();
            },
            () => this.toastr.error('Consulte con el Administrador.', `Error al eliminar: UNIDADES DE MEDIDA`)
          );
      }
    })
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
