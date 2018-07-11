import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../sys-services/authentication.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-sys-navbar',
  templateUrl: './sys-navbar.component.html',
  styleUrls: ['./sys-navbar.component.scss']
})
export class SysNavbarComponent implements OnInit {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.isLogged();
  }
  isLogged() {
    if (localStorage.getItem('currentUser')) {
      this.isLoggedIn$.next(true);
    } else {
      this.isLoggedIn$ = this.authService.isLoggedIn();
    }
  }

}
