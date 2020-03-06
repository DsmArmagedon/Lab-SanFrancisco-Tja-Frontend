import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Meta } from 'src/app/models/meta.model';
import { FormGroup } from '@angular/forms';
import { Expense } from 'src/app/models/expense.model';
import { ExpenseService } from '../../../../services/expense/expense.service';
import { ToastrService } from 'ngx-toastr';
import { ExpensesFilterComponent } from '../expenses-filter/expenses-filter.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ExpensesShowComponent } from '../expenses-show/expenses-show.component';
import Swal from 'sweetalert2';
import { SwalService } from 'src/app/services/swal/swal.service';
import { Router } from '@angular/router';
import { INDEX } from '../../../../global-variables';

@Component({
  selector: 'app-expenses-index',
  templateUrl: './expenses-index.component.html',
  styles: []
})
export class ExpensesIndexComponent implements OnInit {
  public isCollapsed: boolean = false;
  public currentPage: number;

  meta: Meta;
  formFilter: FormGroup;
  perPage: number = 25;
  loadPage: boolean;
  expenses: Expense[] = [];
  maxSize: number = 3;

  bsModalRef: BsModalRef;

  @ViewChild(ExpensesFilterComponent,{ static: true }) expenseFilter: ExpensesFilterComponent;
  constructor(private expenseService: ExpenseService,
              private toastr: ToastrService,
              private modalService: BsModalService,
              private swalService: SwalService,
              private router: Router) {
    this.meta = new Meta;
    this.expenseService.changeSelectBtn(INDEX);
  }

  ngOnInit() {
    this.formFilter = this.expenseFilter.formGroupFilter();
    this.indexExpenses();
  }

  indexExpenses(): void {
    this.loadPage = false;
    this.expenseService.indexExpenses(this.formFilter, this.perPage, this.currentPage).subscribe(
      resp => {
        this.expenses = resp.data;
        this.meta = resp.meta;
      },
      () => this.toastr.error('Consulte con el Administrador', 'Error al listar los GASTOS.')
    ).add(
      () => this.loadPage = true
    );
  }

  filter(event):void {
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
    this.expenseService.expense = expense;
    this.bsModalRef = this.modalService.show(ExpensesShowComponent);
  }

  updateExpenses(code: string): void {
    this.router.navigate(['transaction/expenses/update',code]);
  }

  revokeExpenses(code: string): void {
    this.swalRevokeRestoreExpenses(code, 'revoke', 'Anular', 'Anulando');
  }
  valUpdateDeleteForDate(date_expense: string) {
    return this.expenseService.valUpdateDeleteForDate(date_expense);
  }

  restoreExpenses(code: string ): void{
    this.swalRevokeRestoreExpenses(code, 'restore', 'Restaurar', 'Restaurando');
  }
  
  /**
   * Permite mostrar la opcion de anular o restaurar en un swal.
   * @param code Código del gasto
   * @param type Tipo del gasto revoke o restore
   * @param verb Texto para mostrar en los mensajes del Swal
   * @param gerun Gerundio del tipo de gasto para mostrar en el mensaje
   */
  swalRevokeRestoreExpenses(code: string, type: string, verb: string, gerund: string):void {
    let title: string = 'Gasto';
    Swal.fire(
      this.swalService.revokeRestoreOptions(code, title, verb)
    ).then((result) => {
      if(result.value) {
        this.swalService.revokeRestoreLoad(title,type);
        this.expenseService.revokeRestoreExpenses(code,type).subscribe(
          resp => {
            Swal.close();
            this.toastr.success(`${title} ${resp.code}`,`${title} ${gerund} Correctamente.`);
            this.indexExpenses();
          },
          () => this.swalService.revokeRestoreError(title,type)
        );
      }
    })
  }
}
