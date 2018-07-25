import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
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
