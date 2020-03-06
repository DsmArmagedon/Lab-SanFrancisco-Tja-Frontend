import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Parameter } from 'src/app/models/parameter.model';
import { ParameterService } from '../../../../services/test-composed/parameter.service';
import { Title } from 'src/app/models/title.model';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ParametersStoreUpdateComponent } from '../parameters-store-update/parameters-store-update.component';
import { Subscription } from 'rxjs';
import { TitleService } from 'src/app/services/test-composed/title.service';

@Component({
  selector: 'app-parameters-index',
  templateUrl: './parameters-index.component.html',
  styles: []
})
export class ParametersIndexComponent implements OnInit {
  loadParameters: boolean = true;
  parameters: Parameter[] = [];
  titleSelected: number = null;
  title: string = '';

  bsModalRef: BsModalRef;

  // subscription: Subscription;

  @Output() statusLoadParameteres: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private parameterService: ParameterService,
              private titleService: TitleService,
              private toastr: ToastrService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.titleService.idNameTitleSelectedObservable.subscribe(
      resp => {
        this.title = resp.name;
        this.titleSelected = resp.id;
      }
    );
  }
  updateParameter(parameter: Parameter) {

  }

  indexParameters(): void {
    this.loadParameters = false;
    this.parameterService.indexParameters(this.titleSelected).subscribe(
      resp => this.parameters = resp,
      () => this.toastr.error('Consulte con el Administrador.', 'Error al listar los PARAMETROS.')
    ).add(
      () => {
        this.loadParameters = true;
        this.statusLoadParameteres.emit(!this.loadParameters);
      }
    );
  }

  storeParameters(): void {
    const initialState: any = {
      titleModal: 'Crear Parámetro',
      idTitle: this.titleSelected,
      nameTitle: this.title,
      parameter: null,
      btnStoreUpdate: 'Guardar'
    }
    this.showModal(initialState);
  }
  showModal(initialState: any): void {
    this.bsModalRef = this.modalService.show(ParametersStoreUpdateComponent, { initialState: initialState, ignoreBackdropClick: false });
    console.log(this.titleSelected);
    // this.subscription = this.modalService.onHide.subscribe( () => {
    //   if(this.bsModalRef.content.optionModal) {
    //     // this.indexParameters();
    //   }
    // });
  }
  toUpdateParameters(): void {
    this.indexParameters();
  }
}
