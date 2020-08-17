import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TypesExpensesFilterComponent } from '../types-expenses-filter/types-expenses-filter.component';
import { TypeExpenseService } from 'src/app/services/type-expense.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SwalService } from 'src/app/services/swal.service';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';
import { INDEX } from 'src/app/global-variables';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TypeExpense } from 'src/app/models/type-expense.model';
import { Meta } from 'src/app/models/meta.model';

@Component({
  selector: 'app-types-expenses-index',
  templateUrl: './types-expenses-index.component.html',
  styles: []
})
export class TypesExpensesIndexComponent implements OnInit, OnDestroy {
  @ViewChild(TypesExpensesFilterComponent, { static: true }) typeExpenseFilter: TypesExpensesFilterComponent;
  isCollapsed: boolean = false;
  currentPage: number;
  formFilter: FormGroup;
  typeExpenses: TypeExpense[] = [];
  perPage: number = 25;
  maxSize: number = 3;
  loadTypeExpenses: boolean;
  meta: Meta;

  private onDestroy = new Subject();

  constructor(private typeExpenseService: TypeExpenseService,
    private toastr: ToastrService,
    private swalService: SwalService,
    public gralService: GeneralService,
    private router: Router) {
    this.meta = new Meta;
    this.gralService.changeSelectBtn(INDEX);
  }

  ngOnInit() {
    this.formFilter = this.typeExpenseFilter.formGroupFilter();
    this.indexTypeExpenses()
  }

  indexTypeExpenses(): void {
    this.loadTypeExpenses = false;
    this.typeExpenseService.indexTypeExpenses(this.formFilter.value, this.perPage, this.currentPage)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadTypeExpenses = true)
      )
      .subscribe(
        resp => {
          this.typeExpenses = resp.typeExpenses;
          this.meta = resp.meta;
        },
        () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los TIPOS DE GASTOS.')
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

  updateTypeExpenses(id: number): void {
    this.router.navigate(['transaction/types-expenses/update', id]);
  }

  destroyTypeExpenses(id: number, name: string): void {
    let title: string = 'Tipo de Cargo';
    Swal.fire(
      this.swalService.deleteOptions(name, title)
    ).then(
      (result) => {
        if (result.value) {
          this.swalService.deleteLoad(title);
          this.typeExpenseService.destroyTypeExpenses(id)
            .pipe(
              takeUntil(this.onDestroy),
              finalize(() => Swal.close())
            )
            .subscribe(
              resp => {
                this.toastr.success(`${title} ${resp.name.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente.`);
                this.indexTypeExpenses();
              },
              () => this.toastr.error('Consulte con el Administrador.', `Error al eliminar: TIPO DE GASTO`)
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

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
