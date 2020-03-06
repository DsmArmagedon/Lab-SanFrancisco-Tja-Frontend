import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-companies-positions-filter',
  templateUrl: './companies-positions-filter.component.html',
  styles: []
})
export class CompaniesPositionsFilterComponent implements OnInit {

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
      company_position_name: new FormControl(''),
      company_position_description: new FormControl(''),
      company_position_status: new FormControl(1)
    });
  }

  resetFormFilter(): void {
    this.formFilter.reset();
    this.formFilter.get('company_position_status').setValue(1);
  }

}
