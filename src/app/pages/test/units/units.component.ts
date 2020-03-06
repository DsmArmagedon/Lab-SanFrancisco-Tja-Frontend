import { Component, OnInit, ViewChild } from '@angular/core';
import { UnitsIndexComponent } from './units-index/units-index.component';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html'
})
export class UnitsComponent implements OnInit {

  @ViewChild(UnitsIndexComponent, { static: true }) unitIndex: UnitsIndexComponent;

  constructor() { }

  ngOnInit() {
  }

  executeIndex(): void {
    this.unitIndex.indexUnits();
  }

  selectRowIndexNull(): void {
    this.unitIndex.selectedRowIndex = null;
  }
}
