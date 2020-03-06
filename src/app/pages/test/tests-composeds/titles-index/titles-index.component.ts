import { TitlesStoreUpdateComponent } from './../titles-store-update/titles-store-update.component';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Title } from 'src/app/models/title.model';
import { TestComposedService } from '../../../../services/test-composed/test-composed.service';
import { ParametersIndexComponent } from '../parameters-index/parameters-index.component';
import { STORE } from 'src/app/global-variables';
import { Router } from '@angular/router';
import { TitleService } from '../../../../services/test-composed/title.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-titles-index',
  templateUrl: './titles-index.component.html',
  styles: []
})
export class TitlesIndexComponent implements OnInit {
  loadTitle: boolean = true;
  test: string = '';
  titles: Title[] = [];
  testSelected: number = null;
  selectedRowIndex: number;
  disabledButtonListParameters: boolean;

  bsModalRef: BsModalRef;

  subscription: Subscription;

  @Input()
  type: string;

  @ViewChild(ParametersIndexComponent, { static: true }) parameterIndexComponent: ParametersIndexComponent;

  @Output()
  executeResetFormTestComposed: EventEmitter<any> = new EventEmitter<any>();

  constructor(private testComposedService: TestComposedService,
              private titleService: TitleService,
              private router: Router,
              private modalService: BsModalService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.testComposedService.idNameTestSelectedObservable.subscribe(resp => {
      this.test = resp.name;
      this.testSelected = resp.id;
    });
  }

  showParameters(title: Title): void {
    this.selectedRowIndex = title.id;
    this.disabledButtonListParameters = true;
    this.titleService.changeIdNameTitleSelected(title.id, title.name);
    this.parameterIndexComponent.indexParameters();
  }

  statusLoadParameters(status: boolean): void {
    this.disabledButtonListParameters = status;
  }

  loadTitles(): void {
    this.titles = this.testComposedService.testComposed.titles;
  }

  indexTitles(): void {
    this.loadTitle = false;
    this.titleService.indexTitles(this.testSelected).subscribe(
      resp => this.titles = resp,
      () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los TÍTULOS.')
    ).add(
      () => this.loadTitle = true
    );
  }

  finish(): void {
    if (this.type === STORE) {
      this.test = '';
      this.titles = [];
      this.testSelected = null;
      this.parameterIndexComponent.titleSelected = null;
      this.executeResetFormTestComposed.emit();
    } else {
      this.router.navigate(['/test/tests-composeds/index']);
    }
  }

  storeTitles(): void {
    const initialState: any = {
      titleModal: 'Crear Título',
      idTest: this.testSelected,
      nameTest: this.test,
      title: null,
      btnStoreUpdate: 'Guardar' 
    }
    this.showModal(initialState);
  }

  updateTitles(title: Title): void {
    const initialState: any = {
      titleModal: 'Actualizar Título',
      idTest: this.testSelected,
      nameTest: this.test,
      title: title,
      btnStoreUpdate: 'Actualizar'
    }
    this.showModal(initialState);
  }

  showModal(initialState: any): void {
    this.bsModalRef = this.modalService.show(TitlesStoreUpdateComponent, {initialState: initialState, ignoreBackdropClick: true});
    this.subscription = this.modalService.onHide.subscribe(()=> {
        if(this.bsModalRef.content.optionModal) {
          this.indexTitles();
        }
        this.subscription.unsubscribe();
    })
  }

  toUpdateTitles(): void {
    console.log(this.testSelected);
    this.indexTitles();
  }
}
