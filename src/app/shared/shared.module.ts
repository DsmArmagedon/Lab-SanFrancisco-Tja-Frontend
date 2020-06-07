import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* SCROLLBAR */
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };
/* COMPONENTS */
import { HeaderComponent } from './header/header.component';
import { SharedComponent } from './shared.component';
import { FooterComponent } from './footer/footer.component';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { RouterModule } from '@angular/router';

/* INTERCEPTORS */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenErrorInterceptorService } from '../services/interceptors/token-error-interceptor.service';
import { ServiceModule } from '../services/service.module';
@NgModule({
    declarations: [
        SharedComponent,
        HeaderComponent,
        FooterComponent,
        SiderbarComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        PerfectScrollbarModule
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenErrorInterceptorService,
            multi: true
        },
        ServiceModule
    ]
})

export class SharedModule { }
