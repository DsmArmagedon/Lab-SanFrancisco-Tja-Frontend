import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-units-filter',
  templateUrl: './units-filter.component.html',
  styles: []
})
export class UnitsFilterComponent implements OnInit {

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
      unit_name: new FormControl(''),
      unit_note: new FormControl(''),
      unit_status: new FormControl(1)
    });
  }

  resetFormFilter(): void {
    this.formFilter.reset();
    this.formFilter.get('unit_status').setValue(1);
  }

}
