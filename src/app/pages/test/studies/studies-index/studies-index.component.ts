import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Study } from 'src/app/models/study.model';
import { Meta } from 'src/app/models/meta.model';
import { StudiesFilterComponent } from '../studies-filter/studies-filter.component';
import { StudyService } from '../../../../services/study/study.service';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from '../../../../services/common/swal.service';
import Swal from 'sweetalert2';
import { GeneralService } from 'src/app/services/common/general.service';
import { INDEX } from 'src/app/global-variables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studies-index',
  templateUrl: './studies-index.component.html',
  styles: []
})
export class StudiesIndexComponent implements OnInit {
  public isCollapsed: boolean = false;
  public currentPage: number;
  selectedRowIndex: number;
  formFilter: FormGroup;
  studies: Study[] = [];
  perPage: number = 25;
  maxSize: number = 3;
  loadPage: boolean;
  meta: Meta;

  @ViewChild(StudiesFilterComponent, { static: true }) studyFilter: StudiesFilterComponent;

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
    this.loadPage = false;
    this.studyService.indexStudies(this.formFilter.value, this.perPage, this.currentPage).subscribe(
      resp => {
        this.studies = resp.studies;
        this.meta = resp.meta;
      },
      () => this.toastr.error('Consulte con el administrador.', 'Error al listar los ESTUDIOS.')
    ).add(
      () => this.loadPage = true
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
        this.studyService.destroyStudies(id).subscribe(
          resp => {
            Swal.close();
            this.toastr.success(`${title} ${resp.name.toUpperCase()}`, `${title.toUpperCase()} Eliminado Correctamente.`);
            this.indexStudies();
          },
          err => {
            this.swalService.deleteError(err.status, title);
          }
        );
      }
    })
  }
}
