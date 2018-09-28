/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
/*import {MatSnackBar} from '@angular/material';*/
import {MessageService} from '../services/message.service';
import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {ErrorsHelper} from './errors.helper';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServicesHelper {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    /*private snackBar: MatSnackBar*/
    private errorsHelper: ErrorsHelper,
  ) { }

  /** GET Instances from the server */
  getInstances (absolute_url): Observable<any[]> {
    return this.http.get<any[]>(absolute_url).pipe(
      tap(instances => this.errorsHelper.log(`fetched Instance`)),
      catchError(this.errorsHelper.handleError('getInstance', []))
    );
  }

  /** GET Instances from the server */
  getInstance (absolute_url, instance: any | number): Observable<any> {
    const id = typeof instance === 'number' ? instance : instance.id;
    const url = `${absolute_url}${id}/`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.errorsHelper.log(`fetched Instance id=${id}`)),
      catchError(this.errorsHelper.handleError<any>(`getInstance id=${id}`))
    );
  }

  /** DELETE: delete the any from the server */
  deleteInstance (absolute_url, instance: any | number): Observable<any> {

    const id = typeof instance === 'number' ? instance : instance.id;
    const url = `${absolute_url}${id}/`;

    return this.http.delete<any>(url, httpOptions).pipe(
      tap(_ => this.errorsHelper.log(`deleted any id=${id}`)),
      catchError(this.errorsHelper.handleError<any>('deleteInstance'))
    );

  }

  addInstance (absolute_url, instance: any): Observable<any> { /* old: addArtwork (artwork: Artwork): Observable<Artwork> { */
    const id = typeof instance === 'number' ? instance : instance.id;

    return this.http.post<any>(absolute_url, instance, httpOptions).pipe(
      tap(_ => this.errorsHelper.log(`added instance w/ id=${id}`)),
      catchError(this.errorsHelper.handleError<any>('addInstance'))
    );
  }


  /** PUT: update the Exhibitor on the server */
  updateInstance (absolute_url, instance: any): Observable<any> {
    const id = typeof instance === 'number' ? instance : instance.id;
    const url = `${absolute_url}${id}/`;

    return this.http.put(url, instance, httpOptions).pipe(
      tap(_ => this.errorsHelper.log(`updated any id=${id}`)),
      catchError(this.errorsHelper.handleError<any>('updateany'))
    );
  }



}
