import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-types-expenses',
  templateUrl: './types-expenses.component.html'
})
export class TypesExpensesComponent implements OnInit {

  radioModel: string;
  disabled: boolean = true;
  routeIndex = 'transaction/types-expenses/index';
  routeStore = 'transaction/types-expenses/store';
  routeUpdate = 'transaction/types-expenses/update';

  constructor(private gralService: GeneralService,
    private router: Router) {
    this.gralService.disabledUpdateObservable.pipe(delay(0)).subscribe(resp => this.disabled = resp);
    this.gralService.selectBtnActiveObservable.pipe(delay(0)).subscribe(resp => this.radioModel = resp);
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
