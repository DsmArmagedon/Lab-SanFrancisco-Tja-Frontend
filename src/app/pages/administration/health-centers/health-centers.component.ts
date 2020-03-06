import { Component, OnInit, ViewChild } from '@angular/core';
import { HealthCentersIndexComponent } from './health-centers-index/health-centers-index.component';

@Component({
  selector: 'app-health-centers',
  templateUrl: './health-centers.component.html',
  styles: []
})
export class HealthCentersComponent implements OnInit {
  @ViewChild(HealthCentersIndexComponent, { static: true }) healthCenterIndex: HealthCentersIndexComponent;
  constructor() { }

  ngOnInit() {
  }
  selectRowIndexNull(): void {
    this.healthCenterIndex.selectedRowIndex = null;
  }

  executeIndex(): void {
    this.healthCenterIndex.indexHealthCenters();
  }
}
