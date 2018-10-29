// import {Injectable} from '@angular/core';
// import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
// import {Observable} from 'rxjs';
// import 'rxjs/add/operator/map'
// import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// import {BACKEND_URL} from '../constants';
// import {throwError} from 'rxjs/internal/observable/throwError';
// import {tap} from 'rxjs/operators';
//
//
// @Injectable()
// export class AuthenticationService {
//     public token: string;
//     private loggedIn = new BehaviorSubject<boolean>(false);
//
//     constructor(private http: HttpClient) {
//         // set token if saved in local storage
//         const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//         this.token = currentUser && currentUser.token;
//         this.loggedIn.next(currentUser);
//     }
//
//     get isLoggedIn() {
//         return this.loggedIn.asObservable();
//     }
//
//     login(username: string, password: string) {
//         // add content type header
//
//
//
//       const httpOptions = {
//         headers: new HttpHeaders({
//           'Content-Type':  'application/json'
//         })
//       };
//       return this.http.post<any>(BACKEND_URL + 'rest-auth/login/', JSON.stringify({
//             username: username,
//             password: password
//         }), httpOptions).pipe(
//
//           tap(
//             user => {
//
//               console.log(user);
//
//               // login successful if there's a jwt token in the response
//               if (user && user.token) {
//                 // store user details and jwt token in local storage to keep user logged in between page refreshes
//                 localStorage.setItem('currentUser', JSON.stringify(user));
//                 this.loggedIn.next(true);
//               }
//               return user;
//             },
//
//             error => console.log(error)
//         )
//       )
//     }
//
//   logout() {
//         // remove user from local storage to log user out
//         localStorage.removeItem('currentUser');
//         this.loggedIn.next(false);
//     }
//
//     /**
//      * Get the username if connected
//      * @returns {null|string}
//      */
//     getUsername() {
//         const userInfo = JSON.parse(localStorage.getItem('currentUser'));
//         // return username or null if there is no user connected
//         return userInfo ? userInfo.user.username : null;
//     }
// }
//
//
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {BACKEND_URL} from '../constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient,
                private router: Router) { }
  

  login(username: string, password: string) {
    console.log("1");
    return this.http.post<any>(BACKEND_URL + '/api-token-auth/', JSON.stringify({ username: username, password: password }), httpOptions)
      .pipe(tap(user => {
        console.log("2");
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    //console.log('clic')
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}

