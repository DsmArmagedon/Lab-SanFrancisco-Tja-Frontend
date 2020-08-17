import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-health-centers',
  templateUrl: './health-centers.component.html',
  styles: []
})
export class HealthCentersComponent implements OnInit {
  radioModel: string;
  disabled: boolean = true;
  routeIndex = 'administration/health-centers/index';
  routeStore = 'administration/health-centers/store';
  routeUpdate = 'administration/health-centers/update';

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
