import { Component, OnInit, ViewChild } from '@angular/core';
import { Meta } from 'src/app/models/meta.model';
import { FormGroup } from '@angular/forms';
import { TestComposed } from 'src/app/models/test-composed.model';
import { TestsComposedsFilterComponent } from '../tests-composeds-filter/tests-composeds-filter.component';
import { TestComposedService } from '../../../../services/test-composed/test-composed.service';
import { ToastrService } from 'ngx-toastr';
import { INDEX } from 'src/app/global-variables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tests-composeds-index',
  templateUrl: './tests-composeds-index.component.html',
  styles: []
})
export class TestsComposedsIndexComponent implements OnInit {
  public isCollapsed: boolean = true;
  public currentPage: number;
  meta: Meta;
  formFilter: FormGroup;
  perPage: number = 25;
  loadPage: boolean;
  testComposeds: TestComposed[] = [];
  maxSize: number = 3;
  
  @ViewChild(TestsComposedsFilterComponent,{ static: true }) testComposedFilter: TestsComposedsFilterComponent;
  constructor(private testComposedService: TestComposedService,
              private toastr: ToastrService,
              private router: Router) {
    this.testComposedService.changeSelectBtn(INDEX);
    this.meta = new Meta;
  }

  ngOnInit() {
    this.formFilter = this.testComposedFilter.formGroupFilter();
    this.indexTestComposeds();
  }

  indexTestComposeds(): void {
    this.loadPage = false;
    this.testComposedService.indexTests(this.formFilter.value, this.perPage, this.currentPage).subscribe(
      resp => {
        this.testComposeds = resp.data;
        this.meta = resp.meta;
      },
      () => this.toastr.error('Consulte con el Administrador', 'Error al listar las PRUEBAS.')
    ).add(
      () => this.loadPage = true
    );
  }

  changePerPage(): void {
    this.currentPage = 1;
    this.indexTestComposeds();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.indexTestComposeds();
  }

  updateTest(id: number): void {
    this.router.navigate(['test/tests-composeds/update',id])
  }

  showTest(id: number): void {

  }

  destroyTest(id: number, name: string): void {
    
  }

  resetFormFilter(): void {
    this.testComposedFilter.resetFormFilter();
  }

  filter(event):void {
    this.currentPage = 1;
    this.formFilter = event;
    this.indexTestComposeds();
  }
}
