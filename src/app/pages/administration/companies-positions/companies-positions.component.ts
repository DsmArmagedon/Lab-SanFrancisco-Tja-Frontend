import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/common/general.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-companies-positions',
  templateUrl: './companies-positions.component.html'
})
export class CompaniesPositionsComponent implements OnInit {

  radioModel: string;
  disabled: boolean = true;
  routeIndex = 'administration/companies-positions/index';
  routeStore = 'administration/companies-positions/store';
  routeUpdate = 'administration/companies-positions/update';

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
