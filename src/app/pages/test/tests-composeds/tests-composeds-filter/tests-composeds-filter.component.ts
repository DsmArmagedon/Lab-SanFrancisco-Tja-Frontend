import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tests-composeds-filter',
  templateUrl: './tests-composeds-filter.component.html',
  styles: []
})
export class TestsComposedsFilterComponent implements OnInit {

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
      test_name: new FormControl(''),
      test_price: new FormControl(''),
      test_operator: new FormControl('='),
      study_name: new FormControl(''),
      test_status: new FormControl(1)
    });
  }

  resetFormFilter(): void {
    this.formFilter.reset();
    this.formFilter.get('test_status').setValue(1);
    this.formFilter.get('test_operator').setValue('=');
  }

}
