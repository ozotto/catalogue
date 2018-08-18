import { Component, AfterViewChecked } from '@angular/core';
import {AuthenticationService} from '../../../services/auth/authentication.service';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements AfterViewChecked{

    toggleClass = 'ft-maximize';
    placement = 'bottom-right'
    public isCollapsed = true;
    isLoggedIn$ = new BehaviorSubject<boolean>(false);
    currentLanguage: string;

    constructor(
      private translate: TranslateService, 
      private authService: AuthenticationService
      ) {
      translate.setDefaultLang('en');
    }


    ngAfterViewChecked() {

        setTimeout(() => {
            var wrapperDiv = document.getElementsByClassName("wrapper")[0];
            var dir = wrapperDiv.getAttribute("dir");
            if (dir === 'rtl') {
                this.placement = 'bottom-left';
            }
            else if (dir === 'ltr') {
                this.placement = 'bottom-right';
            }
        }, 3000);

        this.currentLanguage = 'en';

    }

    ToggleClass() {
        if (this.toggleClass === 'ft-maximize') {
            this.toggleClass = 'ft-minimize';
        }
        else
            this.toggleClass = 'ft-maximize'
    }


    ChangeLanguage(language: string) {
      this.translate.use(language);
      this.currentLanguage = language;
    }

    Logout() {
      this.authService.logout();
    }


}
