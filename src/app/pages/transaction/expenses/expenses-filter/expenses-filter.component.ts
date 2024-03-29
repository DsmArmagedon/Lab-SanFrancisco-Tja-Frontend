import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { CONFIG_RANGE_DATEPICKER } from 'src/app/global-variables';
@Component({
  selector: 'app-expenses-filter',
  templateUrl: './expenses-filter.component.html',
  styles: []
})
export class ExpensesFilterComponent implements OnInit {

  formFilter: FormGroup;
  rangeDateFlag: boolean = false;
  config: any = CONFIG_RANGE_DATEPICKER;
  @Output()
  formGroupOutput: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  constructor(private localeService: BsLocaleService) {
    this.localeService.use('es');
  }
  ngOnInit() {
    this.formFilter = this.formGroupFilter();
  }
  filter(): void {
    this.formGroupOutput.emit(this.formFilter);
  }

  formGroupFilter(): FormGroup {
    return new FormGroup({
      expense_code: new FormControl(''),
      expense_description: new FormControl(''),
      expense_operator: new FormControl('='),
      expense_date: new FormControl([null, null]),
      expense_amount: new FormControl(''),
      expense_status: new FormControl(''),
      type_expense_name: new FormControl(null),
      expense_date_option: new FormControl('date_month')
    });
  }

  resetFormFilter(): void {
    this.formFilter.reset();
    this.formFilter.get('expense_status').setValue('');
    this.formFilter.get('expense_date_option').setValue('date_month');
    this.formFilter.get('expense_date').setValue([null, null]);
  }

  changeDate(): void {
    if (this.formFilter.get('expense_date_option').value === 'date_range') {
      this.rangeDateFlag = true;
    } else {
      this.rangeDateFlag = false;
    }
  }
}
