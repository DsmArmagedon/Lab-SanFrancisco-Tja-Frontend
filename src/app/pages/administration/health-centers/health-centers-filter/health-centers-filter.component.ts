import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-health-centers-filter',
  templateUrl: './health-centers-filter.component.html',
  styles: []
})
export class HealthCentersFilterComponent implements OnInit {

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
      health_center_name: new FormControl(''),
      health_center_information: new FormControl(''),
      health_center_status: new FormControl(1)
    });
  }

  resetFormFilter(): void {
    this.formFilter.reset();
    this.formFilter.get('health_center_status').setValue(1);
  }

}
