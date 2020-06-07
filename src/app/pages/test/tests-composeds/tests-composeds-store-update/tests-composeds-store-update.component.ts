import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { TestComposedService } from '../../../../services/test-composed/test-composed.service';
import { STORE, UPDATE } from '../../../../global-variables';
import { ActivatedRoute } from '@angular/router';
import { TestsStoreUpdateComponent } from '../tests-store-update/tests-store-update.component';
import { TitlesIndexComponent } from '../titles-index/titles-index.component';

@Component({
  selector: 'app-tests-composeds-store-update',
  templateUrl: './tests-composeds-store-update.component.html',
  styles: []
})
export class TestsComposedsStoreUpdateComponent implements OnInit, OnDestroy {

  @ViewChild('tabsTestComposed', { static: true }) tabsTestComposed: TabsetComponent;
  @ViewChild(TestsStoreUpdateComponent, { static: true }) testStoreUpdateComponent: TestsStoreUpdateComponent;
  @ViewChild(TitlesIndexComponent, { static: true }) titleIndexComponent: TitlesIndexComponent;

  initialState: {
    title: string,
    type: string,
    btnStoreUpdate: string
  };

  idTestComposed: number;
  constructor(private testComposedService: TestComposedService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      (resp: any) => this.initialState = resp
    );
    
    this.testStoreUpdateComponent.initialState = this.initialState;
    this.titleIndexComponent.type = this.initialState.type;

    switch (this.initialState.type) {
      case STORE:
        this.tabsTestComposed.tabs[1].disabled = true;
        this.testComposedService.changeSelectBtn(STORE);
        break;
      case UPDATE:
        this.tabsTestComposed.tabs[1].disabled = false;
        this.testComposedService.changeDisabledUpdate(false);
        this.testComposedService.changeSelectBtn(UPDATE);
        this.getUpdate();
        break;
    }
    
  }

  ngOnDestroy() {
    if (this.initialState.type == UPDATE) {
      this.testComposedService.changeDisabledUpdate(true);
    }
  }

  getUpdate(): void {
    this.route.paramMap.subscribe(
      params => this.idTestComposed = parseInt(params.get('id'))
    );
    this.testStoreUpdateComponent.loadTest = false;
    this.testStoreUpdateComponent.txtLoad = 'Cargando Prueba';


    this.titleIndexComponent.loadTitle = false;
    this.testComposedService.editTests(this.idTestComposed).subscribe(
      resp => {

        this.testComposedService.testComposed = resp;
        this.testStoreUpdateComponent.assignValuesFormTest();
        this.testStoreUpdateComponent.loadTest = true;

        this.testComposedService.changeIdNameTestSelected(resp.id, resp.name); // Habilitar los botones de agregar y actualizar de listar títulos.
        this.titleIndexComponent.loadTitle = true;
        this.titleIndexComponent.loadTitles();

      }
    );
  }
  disabledTabTest(): void {
    this.tabsTestComposed.tabs[0].disabled = true;
    this.tabsTestComposed.tabs[1].disabled = false;
    this.tabsTestComposed.tabs[1].active = true;
  }

  activeTabTest(): void {
    this.tabsTestComposed.tabs[1].active = true;
  }

  resetFormTestComposed(): void {
    this.tabsTestComposed.tabs[1].disabled = true;
    this.tabsTestComposed.tabs[0].disabled = false;
    this.tabsTestComposed.tabs[0].active = true;
    this.testStoreUpdateComponent.resetFormTest();
  }
}
