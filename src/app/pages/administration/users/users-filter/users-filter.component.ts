import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html'
})
export class UsersFilterComponent implements OnInit {
  
  formFilter: FormGroup;
  @Output()
  formGroupOutput: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  constructor() {
    
  }

  ngOnInit() {
    this.formFilter = this.formGroupFilter();
  }

  filter():void {
    this.formGroupOutput.emit(this.formFilter);
  }

  formGroupFilter(): FormGroup {
    return new FormGroup({
      user_ci: new FormControl(''),
      user_first_name: new FormControl(''),
      user_last_name: new FormControl(''),
      user_email: new FormControl(''),
      user_status: new FormControl(1),
      role_name: new FormControl(''),
      company_position_name: new FormControl('')
    });
  }

  resetFormFilter(): void {
    this.formFilter.reset();
    this.formFilter.get('user_status').setValue(1);
  }
}
