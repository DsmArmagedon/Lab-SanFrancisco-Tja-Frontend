import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/common/general.service';
import { TestComposedService } from 'src/app/services/test-composed/test-composed.service';

@Component({
  selector: 'app-tests-composeds',
  templateUrl: './tests-composeds.component.html'
})
export class TestsComposedsComponent implements OnInit {
  radioModel: string;
  disabledUpdate: boolean = true;
  disabledShow: boolean = true;

  routeIndex = 'test/tests-composeds/index';
  routeStore = 'test/tests-composeds/store';
  routeUpdate = 'test/tests-composeds/update';

  constructor(private gralService: GeneralService,
              private testComposedService: TestComposedService, 
              private router: Router) {
    this.gralService.disabledUpdateObservable.subscribe(
      resp => setTimeout( () => this.disabledUpdate = resp, 0 )
    );
    this.gralService.selectBtnActiveObservable.subscribe(
      resp => setTimeout( () => this.radioModel = resp, 0 )
    );
    this.testComposedService.disabledShowObservable.subscribe(
      resp => setTimeout( () => this.disabledShow = resp, 0)
    );
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
