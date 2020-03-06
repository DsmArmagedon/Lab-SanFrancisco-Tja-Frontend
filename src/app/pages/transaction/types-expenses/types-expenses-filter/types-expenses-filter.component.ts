import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-types-expenses-filter',
  templateUrl: './types-expenses-filter.component.html',
  styles: []
})
export class TypesExpensesFilterComponent implements OnInit {

  formFilter: FormGroup;

  @Output()
  formGroupOutput: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  constructor() { }

  ngOnInit() {
    this.formFilter = this.formGroupFilter();
  }
  filter(): void {
    this.formGroupOutput.emit(this.formFilter);
  }

  formGroupFilter(): FormGroup{
    return new FormGroup({
      type_expense_name: new FormControl(''),
      type_expense_description: new FormControl(''),
      type_expense_status: new FormControl(1)
    });
  }

  resetFormFilter(): void {
    this.formFilter.reset();
    this.formFilter.get('type_expense_status').setValue(1);
  }


}
