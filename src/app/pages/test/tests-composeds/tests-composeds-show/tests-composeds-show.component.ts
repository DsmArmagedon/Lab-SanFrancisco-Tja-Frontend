import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestComposed } from 'src/app/models/test-composed.model';
import { ToastrService } from 'ngx-toastr';
import { TestComposedService } from '../../../../services/test-composed/test-composed.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SHOW } from '../../../../global-variables';
import { GeneralService } from 'src/app/services/common/general.service';

@Component({
  selector: 'app-tests-composeds-show',
  templateUrl: './tests-composeds-show.component.html',
  styles: []
})
export class TestsComposedsShowComponent implements OnInit, OnDestroy {

  testComposed: TestComposed = new TestComposed;

  id: number;

  loadPage: boolean;
  txtLoad: string;

  constructor(private testComposedService: TestComposedService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private gralService: GeneralService) {
    this.txtLoad = 'Cargando Prueba Compuesta';
    this.route.paramMap.subscribe(
      params => this.id = parseInt(params.get('id'))
    );
  }

  ngOnInit() {
    this.testComposedService.changeDisabledShow(false);
    this.gralService.changeSelectBtn(SHOW);
    this.loadPage = false;
    this.testComposedService.showTests(this.id).subscribe(
      resp => this.testComposed = resp,
      () => this.toastr.error('Consulte con el Administrador.', 'Error al mostrar la Prueba Compuesta.')
    ).add(
      () => this.loadPage = true
    );
  }

  ngOnDestroy() {
    this.testComposedService.changeDisabledShow(true);
  }

  finish(): void {
    this.router.navigate(['/test/tests-composeds/index']);
  }
}
