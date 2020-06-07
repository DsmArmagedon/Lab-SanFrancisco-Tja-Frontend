import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Meta } from 'src/app/models/meta.model';
import Swal from 'sweetalert2';
import { CompanyPosition } from '../../../../models/company-position.model';
import { CompanyPositionService } from '../../../../services/company-position/company-position.service';
import { CompaniesPositionsFilterComponent } from '../companies-positions-filter/companies-positions-filter.component';
import { SwalService } from '../../../../services/swal/swal.service';

@Component({
  selector: 'app-companies-positions-index',
  templateUrl: './companies-positions-index.component.html'
})
export class CompaniesPositionsIndexComponent implements OnInit {
  public isCollapsed: boolean = true;
  public currentPage: number;
  selectedRowIndex: number;
  formFilter: FormGroup;
  companyPositions: CompanyPosition[] = [];
  perPage: number = 25;
  maxSize: number = 3;
  loadPage: boolean;
  meta: Meta;
  idCompanyPositionEdit: number;
  @ViewChild(CompaniesPositionsFilterComponent,{ static: true }) companyPositionFilter: CompaniesPositionsFilterComponent;
  constructor(private companyPositionService: CompanyPositionService,
              private toastr: ToastrService,
              private swalService: SwalService) {
    this.meta = new Meta();
  }

  ngOnInit() {
    this.formFilter = this.companyPositionFilter.formGroupFilter();
    this.indexCompanyPositions();
  }

  indexCompanyPositions(): void{
    this.loadPage = false;
    this.companyPositionService.indexCompanyPositions(this.formFilter.value, this.perPage, this.currentPage).subscribe(
      resp => {
        this.companyPositions = resp.data;
        this.meta = resp.meta;
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los CARGOS.')
    ).add(
      () => this.loadPage = true
    );
  }

  updateCompanyPositions(companyPosition: CompanyPosition): void {
    this.selectedRowIndex = companyPosition.id;
    this.companyPositionService.updateCompanyPositionObs(companyPosition);
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

  destroyCompanyPositions(id: number, name: string):void {
    let title: string = 'Cargo';
    if(id == this.companyPositionService.companyPositionEdit.id) {
      this.toastr.error('Prohibido eliminar el CARGO, mientras se encuentre en edición, para continuar seleccione Nuevo.', 'Error al eliminar el CARGO');
      return;
    }
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
            this.swalService.deleteError(err.status,title);
          }
        );
      }
    })
  }
}
