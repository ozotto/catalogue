import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {BACKEND_URL} from '../sys-others/constants';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

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

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
  }
}
