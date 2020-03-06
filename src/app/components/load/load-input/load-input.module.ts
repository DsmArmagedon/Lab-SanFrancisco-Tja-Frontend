import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { LoadInputComponent } from './load-input.component';
@NgModule({
    declarations: [
      LoadInputComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LoadInputComponent
    ]
  })
  export class LoadInputModule { }