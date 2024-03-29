import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {
  toggle: boolean;

  constructor() {
    this.toggle = true;
  }
  ngOnInit() {}

  sideBar(toggle: boolean) {
    this.toggle = toggle;
  }
}
