import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Expense } from 'src/app/models/expense/expense.model';
import { ExpenseService } from '../../../../services/expense/expense.service';
import { ToastrService } from 'ngx-toastr';
import { ExpensesFilterComponent } from '../expenses-filter/expenses-filter.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ExpensesShowComponent } from '../expenses-show/expenses-show.component';
import Swal from 'sweetalert2';
import { SwalService } from 'src/app/services/common/swal.service';
import { Router } from '@angular/router';
import { INDEX } from '../../../../global-variables';
import { GeneralService } from 'src/app/services/common/general.service';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { Meta } from 'src/app/models/custom/meta.model';

@Component({
  selector: 'app-expenses-index',
  templateUrl: './expenses-index.component.html',
  styles: []
})
export class ExpensesIndexComponent implements OnInit, OnDestroy {
  isCollapsed: boolean = false;
  currentPage: number;

  meta: Meta;
  formFilter: FormGroup;
  perPage: number = 25;
  loadPage: boolean;
  expenses: Array<Expense> = [];
  maxSize: number = 3;

  bsModalRef: BsModalRef;

  private onDestroy = new Subject();

  @ViewChild(ExpensesFilterComponent, { static: true }) expenseFilter: ExpensesFilterComponent;
  constructor(private expenseService: ExpenseService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private swalService: SwalService,
    private router: Router,
    private gralService: GeneralService) {
    this.meta = new Meta;
    this.gralService.changeSelectBtn(INDEX);
  }

  ngOnInit() {
    this.formFilter = this.expenseFilter.formGroupFilter();
    this.indexExpenses();
  }

  indexExpenses(): void {
    this.loadPage = false;
    this.expenseService.indexExpenses(this.formFilter, this.perPage, this.currentPage)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadPage = true)
      )
      .subscribe(
        resp => {
          this.expenses = resp.expenses;
          this.meta = resp.meta;
        },
        () => this.toastr.error('Consulte con el Administrador', 'Error al listar los GASTOS.')
      );
  }

  filter(event): void {
    this.currentPage = 1;
    this.formFilter = event;
    this.indexExpenses();
  }

  changePerPage(): void {
    this.currentPage = 1;
    this.indexExpenses();
  }

  resetFormFilter(): void {
    this.expenseFilter.resetFormFilter();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.indexExpenses();
  }

  showExpenses(expense: Expense): void {
    const initialState: any = { expense: expense };
    this.bsModalRef = this.modalService.show(ExpensesShowComponent, { initialState: initialState });
  }

  updateExpenses(code: string): void {
    this.router.navigate(['transaction/expenses/update', code]);
  }

  revokeExpenses(code: string): void {
    this.swalRevokeRestoreExpenses(code, 'revoke', 'Anular', 'Anulando');
  }
  valUpdateDeleteForDate(date_expense: string) {
    return this.expenseService.valUpdateDeleteForDate(date_expense);
  }

  restoreExpenses(code: string): void {
    this.swalRevokeRestoreExpenses(code, 'restore', 'Restaurar', 'Restaurando');
  }

  /**
   * Permite mostrar la opcion de anular o restaurar en un swal.
   * @param code Código del gasto
   * @param type Tipo del gasto revoke o restore
   * @param verb Texto para mostrar en los mensajes del Swal
   * @param gerun Gerundio del tipo de gasto para mostrar en el mensaje
   */
  swalRevokeRestoreExpenses(code: string, type: string, verb: string, gerund: string): void {
    let title: string = 'Gasto';
    Swal.fire(
      this.swalService.revokeRestoreOptions(code, title, verb)
    ).then((result) => {
      if (result.value) {
        this.swalService.revokeRestoreLoad(title, type);
        this.expenseService.revokeRestoreExpenses(code, type)
          .pipe(
            takeUntil(this.onDestroy),
            finalize(() => Swal.close())
          )
          .subscribe(
            resp => {
              this.toastr.success(`${title} ${resp.code}`, `${title} ${gerund} Correctamente.`);
              this.indexExpenses();
            },
            () => this.toastr.error('Consulte con el Administrador.', `Error al ${type}: ${title.toUpperCase()}.`)
          );
      }
    })
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
