import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CompanyPosition } from 'src/app/models/company-position.model';
import { CompanyPositionService } from 'src/app/services/company-position.service';
import { CompaniesPositionsFilterComponent } from '../companies-positions-filter/companies-positions-filter.component';
import { SwalService } from 'src/app/services/swal.service';
import { GeneralService } from 'src/app/services/general.service';
import { INDEX } from 'src/app/global-variables';
import { Router } from '@angular/router';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Meta } from 'src/app/models/meta.model';

@Component({
  selector: 'app-companies-positions-index',
  templateUrl: './companies-positions-index.component.html'
})
export class CompaniesPositionsIndexComponent implements OnInit, OnDestroy {
  @ViewChild(CompaniesPositionsFilterComponent, { static: true }) companyPositionFilter: CompaniesPositionsFilterComponent;
  isCollapsed: boolean = false;
  currentPage: number;
  formFilter: FormGroup;
  companyPositions: CompanyPosition[] = [];
  perPage: number = 25;
  maxSize: number = 3;
  loadCompanyPositions: boolean;
  meta: Meta;

  private onDestroy = new Subject();

  constructor(private companyPositionService: CompanyPositionService,
    private toastr: ToastrService,
    private swalService: SwalService,
    public gralService: GeneralService,
    private router: Router) {
    this.meta = new Meta;
    this.gralService.changeSelectBtn(INDEX);
  }

  ngOnInit() {
    this.formFilter = this.companyPositionFilter.formGroupFilter();
    this.indexCompanyPositions();
  }

  indexCompanyPositions(): void {
    this.loadCompanyPositions = false;
    this.companyPositionService.indexCompanyPositions(this.formFilter.value, this.perPage, this.currentPage)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadCompanyPositions = true)
      ).subscribe(
        resp => {
          this.companyPositions = resp.companyPositions;
          this.meta = resp.meta;
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los CARGOS.')
      );
  }

  updateCompanyPositions(id: number): void {
    this.router.navigate(['administration/companies-positions/update', id]);
  }

  resetFormFilter(): void {
    this.companyPositionFilter.resetFormFilter();
  }

  filter(event): void {
    this.currentPage = 1;
    this.formFilter = event;
    this.indexCompanyPositions();
  }

  changePerPage(): void {
    this.currentPage = 1;
    this.indexCompanyPositions();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.indexCompanyPositions();
  }

  destroyCompanyPositions(id: number, name: string): void {
    let title: string = 'Cargo';
    Swal.fire(
      this.swalService.deleteOptions(name, title)
    ).then((result) => {
      if (result.value) {
        this.swalService.deleteLoad(title);
        this.companyPositionService.destroyCompanyPositions(id)
          .pipe(
            takeUntil(this.onDestroy),
            finalize(() => Swal.close())
          )
          .subscribe(
            resp => {
              this.toastr.success(`${title} ${resp.name.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente.`);
              this.indexCompanyPositions();
            },
            () => this.toastr.error('Consulte con el Administrador.', `Error al eliminar: CARGO.`)
          );
      }
    })
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
