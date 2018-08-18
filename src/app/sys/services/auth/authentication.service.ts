import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {BACKEND_URL} from '../../constants';
import {BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  token: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  isLoggedIn() {
    return this.loggedIn;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${BACKEND_URL}/api-token-auth/`, { username: username, password: password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          /*
          eventID
          mailContact
          contactID
          exhID

           */
          this.loggedIn.next(true);
        }

        return user;
      }));
  }

  signupUser(email: string, password: string) {
    //your code for signing up the new user
  }

  signinUser(email: string, password: string) {
    //your code for checking credentials and getting tokens for for signing in user
  }

  logout() {
    // remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }

  getToken() {    
    return this.token;
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token 
    return true;
  }
}
