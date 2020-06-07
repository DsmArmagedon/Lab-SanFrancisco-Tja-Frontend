import { Component, OnInit } from '@angular/core';
import { TestComposedService } from '../../../services/test-composed/test-composed.service';
import { Router } from '@angular/router';

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

  constructor(private testComposedService: TestComposedService,
              private router: Router) {
    this.testComposedService.disabledUpdateObservable.subscribe(
      resp => setTimeout( () => this.disabledUpdate = resp, 0 )
    );
    this.testComposedService.selectBtnActiveObservable.subscribe(
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
