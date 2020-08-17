import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TestComposed } from 'src/app/models/test-composed.model';
import { TestsComposedsFilterComponent } from '../tests-composeds-filter/tests-composeds-filter.component';
import { TestComposedService } from 'src/app/services/test-composed.service';
import { ToastrService } from 'ngx-toastr';
import { INDEX } from 'src/app/global-variables';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SwalService } from 'src/app/services/swal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { Meta } from 'src/app/models/meta.model';

@Component({
  selector: 'app-tests-composeds-index',
  templateUrl: './tests-composeds-index.component.html',
  styles: []
})
export class TestsComposedsIndexComponent implements OnInit, OnDestroy {
  @ViewChild(TestsComposedsFilterComponent, { static: true }) testComposedFilter: TestsComposedsFilterComponent;
  public isCollapsed: boolean = false;
  public currentPage: number;
  meta: Meta;
  formFilter: FormGroup;
  perPage: number = 25;
  loadTestComposed: boolean;
  testComposeds: TestComposed[] = [];
  maxSize: number = 3;


  bsModalRef: BsModalRef;

  private onDestroy = new Subject();

  constructor(private testComposedService: TestComposedService,
    private toastr: ToastrService,
    private router: Router,
    private swalService: SwalService,
    private gralService: GeneralService) {
    this.gralService.changeSelectBtn(INDEX);
    this.meta = new Meta;
  }

  ngOnInit() {
    this.formFilter = this.testComposedFilter.formGroupFilter();
    this.indexTestComposeds();
  }

  indexTestComposeds(): void {
    this.loadTestComposed = false;
    this.testComposedService.indexTests(this.formFilter.value, this.perPage, this.currentPage)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadTestComposed = true)
      )
      .subscribe(
        resp => {
          this.testComposeds = resp.testComposeds;
          this.meta = resp.meta;
        },
        () => this.toastr.error('Consulte con el Administrador', 'Error al listar las PRUEBAS.')
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
    this.router.navigate(['test/tests-composeds/update', id]);
  }

  showTest(id: number): void {
    this.router.navigate(['test/tests-composeds/show', id]);
  }

  destroyTest(id: number, name: string): void {
    let title: string = 'Prueba Compuesta';
    Swal.fire(
      this.swalService.deleteOptions(name, title)
    ).then(
      (result) => {
        if (result.value) {
          this.swalService.deleteLoad(title);
          this.testComposedService.destroyTests(id)
            .pipe(
              takeUntil(this.onDestroy),
              finalize(() => Swal.close())
            )
            .subscribe(
              resp => {
                this.toastr.success(`${title} ${resp.name.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente.`);
                this.indexTestComposeds();
              },
              () => this.toastr.error('Consulte con el Administrador.', `Error al eliminar: PRUEBA.`)
            );
        }
      }
    );
  }

  resetFormFilter(): void {
    this.testComposedFilter.resetFormFilter();
  }

  filter(event): void {
    this.currentPage = 1;
    this.formFilter = event;
    this.indexTestComposeds();
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
