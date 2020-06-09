import { Component, OnInit, ViewChild } from '@angular/core';
import { TypeExpense } from '../../../../models/type-expense.model';
import { FormGroup } from '@angular/forms';
import { Meta } from 'src/app/models/meta.model';
import { TypesExpensesFilterComponent } from '../types-expenses-filter/types-expenses-filter.component';
import { TypeExpenseService } from '../../../../services/type-expense/type-expense.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SwalService } from '../../../../services/common/swal.service';

@Component({
  selector: 'app-types-expenses-index',
  templateUrl: './types-expenses-index.component.html',
  styles: []
})
export class TypesExpensesIndexComponent implements OnInit {
  public isCollapsed: boolean = true;
  public currentPage: number;
  selectedRowIndex: number;
  formFilter: FormGroup;
  typeExpenses: TypeExpense[] = [];
  perPage: number = 25;
  maxSize: number = 3;
  loadPage: boolean;
  meta: Meta;
  @ViewChild(TypesExpensesFilterComponent, { static: true }) typeExpenseFilter: TypesExpensesFilterComponent;
  constructor(private typeExpenseService: TypeExpenseService,
    private toastr: ToastrService,
    private swalService: SwalService) {
    this.meta = new Meta;
  }

  ngOnInit() {
    this.formFilter = this.typeExpenseFilter.formGroupFilter();
    this.indexTypeExpenses()
  }

  indexTypeExpenses(): void {
    this.loadPage = false;
    this.typeExpenseService.indexTypeExpenses(this.formFilter.value, this.perPage, this.currentPage).subscribe(
      resp => {
        this.typeExpenses = resp.data;
        this.meta = resp.meta;
      },
      () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los TIPOS DE GASTOS.')
    ).add(
      () => this.loadPage = true
    );
  }

  changePerPage(): void {
    this.currentPage = 1;
    this.indexTypeExpenses();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.indexTypeExpenses();
  }

  resetFormFilter(): void {
    this.typeExpenseFilter.resetFormFilter();
  }

  updateTypeExpenses(typeExpense: TypeExpense): void {
    this.selectedRowIndex = typeExpense.id;
    this.typeExpenseService.updateTypeExpenseObs(typeExpense);
  }

  destroyTypeExpenses(id: number, name: string): void {
    let title: string = 'Tipo de Cargo';
    if (id == this.typeExpenseService.typeExpenseEdit.id) {
      this.toastr.error('Prohibido eliminar el TIPO DE CARGO, mientras se encuentre en edición, para continuar seleccione Nuevo.', 'Error al eliminar el TIPO DE CARGO');
      return;
    }
    Swal.fire(
      this.swalService.deleteOptions(name, title)
    ).then(
      (result) => {
        if (result.value) {
          this.swalService.deleteLoad(title);
          this.typeExpenseService.destroyTypeExpenses(id).subscribe(
            resp => {
              Swal.close();
              this.toastr.success(`${title} ${resp.name.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente.`);
              this.indexTypeExpenses();
            },
            err => {
              this.swalService.deleteError(err.status, title);
            }
          );
        }
      }
    );
  }

  filter(event): void {
    this.currentPage = 1;
    this.formFilter = event;
    this.indexTypeExpenses();
  }
}
