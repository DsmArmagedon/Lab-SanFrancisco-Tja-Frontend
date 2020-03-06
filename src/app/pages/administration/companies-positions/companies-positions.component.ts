import { Component, OnInit, ViewChild } from '@angular/core';
import { CompaniesPositionsIndexComponent } from './companies-positions-index/companies-positions-index.component';

@Component({
  selector: 'app-companies-positions',
  templateUrl: './companies-positions.component.html'
})
export class CompaniesPositionsComponent implements OnInit {

  @ViewChild(CompaniesPositionsIndexComponent, { static: true }) companyPositionIndex: CompaniesPositionsIndexComponent;


  constructor() { }

  ngOnInit() {
  }


  executeIndex(): void {
    this.companyPositionIndex.indexCompanyPositions();
  }

  selectRowIndexNull(): void {
    this.companyPositionIndex.selectedRowIndex = null;
  }
}
