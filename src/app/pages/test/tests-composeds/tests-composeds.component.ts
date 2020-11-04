import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { TestComposedService } from 'src/app/services/test-composed.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-tests-composeds',
  templateUrl: './tests-composeds.component.html'
})
export class TestsComposedsComponent implements OnInit {
  radioModel: string;
  disabledUpdate: boolean = true;
  disabledShow: boolean = true;

  routeIndex = 'test/tests-composed/index';
  routeStore = 'test/tests-composed/store';
  routeUpdate = 'test/tests-composed/update';

  constructor(private gralService: GeneralService,
    private testComposedService: TestComposedService,
    private router: Router) {
    this.gralService.disabledUpdateObservable.pipe(delay(0)).subscribe(resp => this.disabledUpdate = resp);
    this.gralService.selectBtnActiveObservable.pipe(delay(0)).subscribe(resp => this.radioModel = resp);
    this.testComposedService.disabledShowObservable.pipe(delay(0)).subscribe(resp => this.disabledShow = resp);
  }

  ngOnInit() {
  }

  routerIndex(): void {
    this.router.navigate([this.routeIndex]);
  }

  routerStore(): void {
    this.router.navigate([this.routeStore]);
  }
}
