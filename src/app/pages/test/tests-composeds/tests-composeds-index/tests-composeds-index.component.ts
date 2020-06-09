import { Component, OnInit, ViewChild } from '@angular/core';
import { Meta } from 'src/app/models/meta.model';
import { FormGroup } from '@angular/forms';
import { TestComposed } from 'src/app/models/test-composed.model';
import { TestsComposedsFilterComponent } from '../tests-composeds-filter/tests-composeds-filter.component';
import { TestComposedService } from '../../../../services/test-composed/test-composed.service';
import { ToastrService } from 'ngx-toastr';
import { INDEX } from 'src/app/global-variables';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SwalService } from '../../../../services/common/swal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { TestsComposedsShowComponent } from '../tests-composeds-show/tests-composeds-show.component';

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
  

  bsModalRef: BsModalRef;
  subscription: Subscription;

  @ViewChild(TestsComposedsFilterComponent,{ static: true }) testComposedFilter: TestsComposedsFilterComponent;
  constructor(private testComposedService: TestComposedService,
              private toastr: ToastrService,
              private router: Router,
              private swalService: SwalService) {
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
    this.router.navigate(['test/tests-composeds/update',id]);
  }

  showTest(id: number): void {
    this.router.navigate(['test/tests-composeds/show',id]);
  }

  destroyTest(id: number, name: string): void {
    let title: string = 'Prueba Compuesta';
    Swal.fire(
      this.swalService.deleteOptions(name,title)
    ).then(
      (result) => {
        if(result.value) {
          this.swalService.deleteLoad(title);
          this.testComposedService.destroyTests(id).subscribe(
            resp => {
              Swal.close();
              this.toastr.success(`${title} ${resp.name.toUpperCase()}`,`${title.toUpperCase()} Eliminado Correctamente.`);
              this.indexTestComposeds();
            },
            err => {
              this.swalService.deleteError(err.status, title);
            }
          );
        }
      }
    );
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
