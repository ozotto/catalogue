import { Component, OnInit } from '@angular/core';
//import { first } from 'rxjs/operators';


import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {TranslateService} from '@ngx-translate/core';


@Component({
  templateUrl: 'home.component.html'
})


export class HomeComponent implements OnInit {
  
  options = {
    direction: 'ltr'
  };

  currentUser: User;
  users: User[] = [];

  

  constructor(
      private translate: TranslateService, 
      private userService: UserService
    ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    // this.loadAllUsers();
  }

  // deleteUser(id: number) {
  //   this.userService.delete(id).pipe(first()).subscribe(() => {
  //     this.loadAllUsers()
  //   });
  // }

  // private loadAllUsers() {
  //   this.userService.getAll().pipe(first()).subscribe(users => {
  //     this.users = users;
  //   });
  // }
  // useLanguage(language: string) {
  //   this.translate.use(language);
  // }
}
