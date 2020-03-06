import { Component, OnInit, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/login/authentication.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() statusSidebar = new EventEmitter<boolean>();
  private sideBarToggle: boolean;
  private userAuthenticateObservableSusc: Subscription;
  user: User;
  dropdownActive: boolean;
  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.userAuthenticateObservableSusc = this.authenticationService.userAuthenticateObservable.subscribe(
      user => {
        this.user = user;
      });
    this.sideBarToggle = true;
    this.dropdownActive = false;
    
  }
  @HostListener ('document:click', ['$event']) clickedOutActive( $event ) {
    if (this.dropdownActive) {
      this.dropdownActive = false;
    }
  }

  ngOnInit() {
      this.authenticationService.loadUserAuth();
  }
  active($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dropdownActive = !this.dropdownActive;
  }
  toggle() {
    this.sideBarToggle = !this.sideBarToggle;
    this.statusSidebar.emit(this.sideBarToggle);
  }

  ngOnDestroy() {
    this.userAuthenticateObservableSusc.unsubscribe();
  }

  logout():void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
