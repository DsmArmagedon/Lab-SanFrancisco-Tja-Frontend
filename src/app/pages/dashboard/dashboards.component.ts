import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboards.component.html'
})
export class DashboardsComponent implements OnInit {
  formPrueba: FormGroup;
  selectedOption: any;
  optionOnBlur: any;
  noResult = false;
  constructor() {
  }

  states: any = [
    {
      id: 1,
      name: 'tarija'
    },
    {
      id: 2,
      name: 'potosi'
    },
    {
      id: 3,
      name: 'chuquisaca'
    },
    {
      id: 4,
      name: 'santa cruz'
    },
    {
      id: 5,
      name: 'beni'
    },
    {
      id: 6,
      name: 'pando'
    }
  ]
  ngOnInit() {
    this.formPrueba = this.formGroupPrueba();
  }
  formGroupPrueba() {
    return new FormGroup({
      username: new FormControl(''),
      state: new FormControl('')
    })
  }
  get username() { return this.formPrueba.get('username'); }
  get state() { return this.formPrueba.get('state'); }
  saveFormPrueba(): void {
    console.log(this.state.value);
    console.log(this.selectedOption);
  }
  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
  }
  typeaheadOnBlur(event: any): void {
    console.log(event);
    this.optionOnBlur = event.item;
  }
}
