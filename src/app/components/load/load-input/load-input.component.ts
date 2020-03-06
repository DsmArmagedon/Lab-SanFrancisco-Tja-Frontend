import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-load-input',
  styles:[`
    .parpadea {
    animation-name: parpadeo;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    -webkit-animation-name: parpadeo;
    -webkit-animation-duration: 1s;
    -webkit-animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    color: rgb(86, 192, 216);
}

@-moz-keyframes parpadeo {
    0% {
        opacity: 1.0;
    }
    50% {
        opacity: 0.0;
    }
    100% {
        opacity: 1.0;
    }
}

@-webkit-keyframes parpadeo {
    0% {
        opacity: 1.0;
    }
    50% {
        opacity: 0.0;
    }
    100% {
        opacity: 1.0;
    }
}

@keyframes parpadeo {
    0% {
        opacity: 1.0;
    }
    50% {
        opacity: 0.0;
    }
    100% {
        opacity: 1.0;
    }
}
  `],
  template:`
    <div class="form-control text-center" *ngIf="!loadInput">
      <i class="fa fa-spinner fa-spin" style="color: rgb(86, 192, 216);"></i>
      <span class="parpadea"> Cargando</span>
    </div>
    `
})
export class LoadInputComponent {
  @Input()
  loadInput: boolean;
  constructor() { }
}