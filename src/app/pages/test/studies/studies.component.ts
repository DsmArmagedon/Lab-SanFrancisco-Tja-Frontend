import { Component, OnInit, ViewChild } from '@angular/core';
import { StudiesIndexComponent } from './studies-index/studies-index.component';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html'
})
export class StudiesComponent implements OnInit {

  @ViewChild(StudiesIndexComponent, { static: true }) studyIndex: StudiesIndexComponent;
  
  constructor() { }

  ngOnInit() {
  }

  executeIndex(): void {
    this.studyIndex.indexStudies();
  }

  selectRowIndexNull(): void {
    this.studyIndex.selectedRowIndex = null;
  }
}
