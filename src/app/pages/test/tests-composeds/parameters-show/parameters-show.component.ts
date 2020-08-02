import { Component, OnInit } from '@angular/core';
import { Parameter } from 'src/app/models/parameter/parameter.model';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-parameters-show',
  templateUrl: './parameters-show.component.html',
  styles: []
})
export class ParametersShowComponent implements OnInit {

  parameter: Parameter;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
