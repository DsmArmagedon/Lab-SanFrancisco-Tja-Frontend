import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Study } from 'src/app/models/study.model';
import { Meta } from 'src/app/models/meta.model';
import { StudiesFilterComponent } from '../studies-filter/studies-filter.component';
import { StudyService } from '../../../../services/study/study.service';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from '../../../../services/swal/swal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-studies-index',
  templateUrl: './studies-index.component.html',
  styles: []
})
export class StudiesIndexComponent implements OnInit {
  public isCollapsed: boolean = true;
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
              private swalService: SwalService) {
    this.meta = new Meta;
  }

  ngOnInit() {
    this.formFilter = this.studyFilter.formGroupFilter();
    this.indexStudies();
  }

  indexStudies(): void {
    this.loadPage = false;
    this.studyService.indexStudies(this.formFilter.value, this.perPage, this.currentPage).subscribe(
      resp => {
        this.studies = resp.data;
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

  updateStudies(study: Study): void {
    this.selectedRowIndex = study.id;
    this.studyService.updateStudyObs(study);
  }

  destroyStudies(id: number, name: string): void {
    let title: string = 'Estudio';
    if(id == this.studyService.studyEdit.id) {
      this.toastr.error('Prohibido eliminar el ESTUDIO, mientras se encuentre en edición, para continuar seleccione Nuevo.', 'Error al eliminar el ESTUDIO');
      return;
    }
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
            this.swalService.deleteError(err.status,title);
          }
        );
      }
    })
  }
}
