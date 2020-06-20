import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Meta } from 'src/app/models/meta.model';
import Swal from 'sweetalert2';
import { CompanyPosition } from '../../../../models/company-position.model';
import { CompanyPositionService } from '../../../../services/company-position/company-position.service';
import { CompaniesPositionsFilterComponent } from '../companies-positions-filter/companies-positions-filter.component';
import { SwalService } from '../../../../services/common/swal.service';
import { GeneralService } from 'src/app/services/common/general.service';
import { INDEX } from 'src/app/global-variables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companies-positions-index',
  templateUrl: './companies-positions-index.component.html'
})
export class CompaniesPositionsIndexComponent implements OnInit {
  @ViewChild(CompaniesPositionsFilterComponent, { static: true }) companyPositionFilter: CompaniesPositionsFilterComponent;
  public isCollapsed: boolean = false;
  public currentPage: number;
  selectedRowIndex: number;
  formFilter: FormGroup;
  companyPositions: CompanyPosition[] = [];
  perPage: number = 25;
  maxSize: number = 3;
  loadPage: boolean;
  meta: Meta;
  idCompanyPositionEdit: number;
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
    this.loadPage = false;
    this.companyPositionService.indexCompanyPositions(this.formFilter.value, this.perPage, this.currentPage).subscribe(
      resp => {
        this.companyPositions = resp.companyPositions;
        this.meta = resp.meta;
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los CARGOS.')
    ).add(
      () => this.loadPage = true
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
        this.companyPositionService.destroyCompanyPositions(id).subscribe(
          resp => {
            Swal.close();
            this.toastr.success(`${title} ${resp.name.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente.`);
            this.indexCompanyPositions();
          },
          err => {
            this.swalService.deleteError(err.status, title);
          }
        );
      }
    })
  }
}
