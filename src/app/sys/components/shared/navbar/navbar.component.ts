import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../../../models/user';
import {PermissionsHelper} from '../../../helpers/permissions.helper';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

//export class NavbarComponent implements AfterViewChecked{
export class NavbarComponent implements OnInit{

    toggleClass = 'ft-maximize';
    placement = 'bottom-right'
    public isCollapsed = true;
    currentLanguage: string;
    currentUser: User;

    constructor(
      private translate: TranslateService,
      private authService: AuthenticationService,
      private permissionshelper: PermissionsHelper
      ) {
      translate.setDefaultLang('en');
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    //OnInit() {
    ngOnInit(){
      this.currentLanguage = 'en';
      const isSuperUser = this.permissionshelper.showIfAutorized();
    }



 /*   ngAfterViewChecked() {
      console.log("coucou: "+this.currentUser);
      if(this.currentUser !== null){
        setTimeout(() => {
            const wrapperDiv = document.getElementsByClassName('wrapper')[0];
          const dir = wrapperDiv.getAttribute('dir');
            if (dir === 'rtl') {
                this.placement = 'bottom-left';
            } else if (dir === 'ltr') {
                this.placement = 'bottom-right';
            }
        }, 3000);

        this.currentLanguage = 'en';
       }
    }*/

    toggleAddClass() {
        if (this.toggleClass === 'ft-maximize') {
            this.toggleClass = 'ft-minimize';
        } else {
          this.toggleClass = 'ft-maximize';
        }
    }


    changeLanguage(language: string) {
      this.translate.use(language);
      this.currentLanguage = language;
    }

    logout() {
      this.authService.logout();
    }


}
