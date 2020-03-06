import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-load',
  styles: [`

  .parpadea {
  animation-name: parpadeo;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  -webkit-animation-name: parpadeo;
  -webkit-animation-duration: 2s;
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
  template: `
  <div class="text-center" [ngStyle]="{'width':width}">
    <i class="fa fa-spinner fa-spin fa-3x" style="color: rgb(86, 192, 216);"></i><br>
    <span style="font-style: italic; font-weight:750; color: rgb(86, 192, 216);"> {{txtLoad}}</span>
  </div>
  `
})
export class LoadComponent implements OnInit {
  @Input()
  txtLoad: string;
  @Input()
  width: string = '140px';
  constructor() { }

  ngOnInit() {
  }

}
