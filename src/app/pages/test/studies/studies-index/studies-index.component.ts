import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Study } from 'src/app/models/study/study.model';
import { StudiesFilterComponent } from '../studies-filter/studies-filter.component';
import { StudyService } from '../../../../services/study/study.service';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from '../../../../services/common/swal.service';
import Swal from 'sweetalert2';
import { GeneralService } from 'src/app/services/common/general.service';
import { INDEX } from 'src/app/global-variables';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { Meta } from 'src/app/models/custom/meta.model';

@Component({
  selector: 'app-studies-index',
  templateUrl: './studies-index.component.html',
  styles: []
})
export class StudiesIndexComponent implements OnInit {
  @ViewChild(StudiesFilterComponent, { static: true }) studyFilter: StudiesFilterComponent;

  public isCollapsed: boolean = false;
  public currentPage: number;
  formFilter: FormGroup;
  studies: Study[] = [];
  perPage: number = 25;
  maxSize: number = 3;
  loadStudies: boolean;
  meta: Meta;

  private onDestroy = new Subject();

  constructor(private studyService: StudyService,
    private toastr: ToastrService,
    private swalService: SwalService,
    private gralService: GeneralService,
    private router: Router) {
    this.meta = new Meta;
    this.gralService.changeSelectBtn(INDEX);
  }

  ngOnInit() {
    this.formFilter = this.studyFilter.formGroupFilter();
    this.indexStudies();
  }

  indexStudies(): void {
    this.loadStudies = false;
    this.studyService.indexStudies(this.formFilter.value, this.perPage, this.currentPage)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadStudies = true)
      )
      .subscribe(
        resp => {
          this.studies = resp.studies;
          this.meta = resp.meta;
        },
        () => this.toastr.error('Consulte con el administrador.', 'Error al listar los ESTUDIOS.')
      );
  }

  changePerPage(): void {
    this.currentPage = 1;
    this.indexStudies();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.indexStudies();
  }

  resetFormFilter(): void {
    this.studyFilter.resetFormFilter();
  }

  filter(event): void {
    this.currentPage = 1;
    this.formFilter = event;
    this.indexStudies();
  }

  updateStudies(id: number): void {
    this.router.navigate(['test/studies/update', id]);
  }

  destroyStudies(id: number, name: string): void {
    let title: string = 'Estudio';
    Swal.fire(
      this.swalService.deleteOptions(name, title)
    ).then((result) => {
      if (result.value) {
        this.swalService.deleteLoad(title);
        this.studyService.destroyStudies(id)
          .pipe(
            takeUntil(this.onDestroy),
            finalize(() => Swal.close())
          )
          .subscribe(
            resp => {
              this.toastr.success(`${title} ${resp.name.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente.`);
              this.indexStudies();
            },
            () => this.toastr.error('Consulte con el Administrador.', `Error al eliminar: ESTUDIO.`)
          );
      }
    })
  }
}
