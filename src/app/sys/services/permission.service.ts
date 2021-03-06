﻿import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BACKEND_URL} from '../constants';
import {Observable} from 'rxjs/index';
import {catchError, tap} from 'rxjs/operators';
import {ErrorsHelper} from '../helpers/errors.helper';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PermissionService {
    constructor(private http: HttpClient,
                private errorsHelper: ErrorsHelper) { }

  getUserInfoByToken(): Observable<any> {

    const url = BACKEND_URL + '/api-token-verify/';
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post<any>(url, {'token': currentUser.token}, httpOptions).pipe(
      tap(instance => {
        // console.log('instance');
        // console.log(instance);
      }),
      catchError(this.errorsHelper.handleError<any>('getUserInfoByToken'))
    );
  }



  getExhibitorByUser(): Observable<any> {
    const url = BACKEND_URL + '/exhibitor/exhibitors/';
    //console.log('currentUser')
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //console.log(currentUser)
    return this.http.get<any>(url, httpOptions).pipe(
      tap(instance => { }),
      catchError(this.errorsHelper.handleError<any>('getExhibitorByUser'))
    );
  }

}
