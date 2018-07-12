import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../sys-services/authentication.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sys-navbar',
  templateUrl: './sys-navbar.component.html',
  styleUrls: ['./sys-navbar.component.scss']
})
export class SysNavbarComponent implements OnInit {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  currentLanguage: string;

  constructor(private translate: TranslateService, private authService: AuthenticationService) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.isLogged();
    this.currentLanguage = 'en';
  }
  isLogged() {
    if (localStorage.getItem('currentUser')) {
      this.isLoggedIn$.next(true);
    } else {
      this.isLoggedIn$ = this.authService.isLoggedIn();
    }
  }
  useLanguage(language: string) {
    this.translate.use(language);
    this.currentLanguage = language;
  }

}
