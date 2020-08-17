import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestComposed } from 'src/app/models/test-composed.model';
import { ToastrService } from 'ngx-toastr';
import { TestComposedService } from 'src/app/services/test-composed.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SHOW } from 'src/app/global-variables';
import { GeneralService } from 'src/app/services/general.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Study } from 'src/app/models/study.model';

@Component({
  selector: 'app-tests-composeds-show',
  templateUrl: './tests-composeds-show.component.html',
  styles: []
})
export class TestsComposedsShowComponent implements OnInit, OnDestroy {

  testComposed: TestComposed = new TestComposed;

  id: number;

  loadTestComposed: boolean;
  txtStatusSecTestComposed: string;

  private onDestroy = new Subject();

  constructor(private testComposedService: TestComposedService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private gralService: GeneralService) {
    this.testComposed.study = new Study;
    this.txtStatusSecTestComposed = 'Cargando Prueba Compuesta';
    this.getIdToParameterFromUrl();
  }

  ngOnInit() {
    this.testComposedService.changeDisabledShow(false);
    this.gralService.changeSelectBtn(SHOW);
    this.loadTestComposed = false;
    this.testComposedService.showTests(this.id)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loadTestComposed = true)
      )
      .subscribe(
        resp => this.testComposed = resp,
        () => this.toastr.error('Consulte con el Administrador.', 'Error al mostrar la Prueba Compuesta.')
      );
  }

  getIdToParameterFromUrl(): void {
    this.route.paramMap.subscribe(
      params => this.id = parseInt(params.get('id'))
    );
  }

  ngOnDestroy() {
    this.testComposedService.changeDisabledShow(true);
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  finish(): void {
    this.router.navigate(['/test/tests-composeds/index']);
  }
}
