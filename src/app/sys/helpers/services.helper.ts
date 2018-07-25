/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {MessageService} from '../services/message.service';
import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';

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
    private snackBar: MatSnackBar
  ) { }

  /** GET Exhibitors from the server */
  getInstances (absolute_url): Observable<any[]> {
    return this.http.get<any[]>(absolute_url).pipe(
      tap(instances => this.log(`fetched Instance`)),
      catchError(this.handleError('getInstance', []))
    );
  }

  /** GET Exhibitors from the server */
  getInstance (absolute_url, instance: any | number): Observable<any> {
    const id = typeof instance === 'number' ? instance : instance.id;
    const url = `${absolute_url}${id}/`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched Instance id=${id}`)),
      catchError(this.handleError<any>(`getInstance id=${id}`))
    );
  }

  /** DELETE: delete the any from the server */
  deleteInstance (absolute_url, instance: any | number): Observable<any> {

    const id = typeof instance === 'number' ? instance : instance.id;
    const url = `${absolute_url}${id}/`;

    return this.http.delete<any>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted any id=${id}`)),
      catchError(this.handleError<any>('deleteInstance'))
    );

  }

  addInstance (absolute_url, instance: any): Observable<any> { /* old: addArtwork (artwork: Artwork): Observable<Artwork> { */
    const id = typeof instance === 'number' ? instance : instance.id;

    return this.http.post<any>(absolute_url, instance, httpOptions).pipe(
      tap(_ => this.log(`added instance w/ id=${id}`)),
      catchError(this.handleError<any>('addInstance'))
    );
  }


  /** PUT: update the Exhibitor on the server */
  updateInstance (absolute_url, instance: any): Observable<any> {
    const id = typeof instance === 'number' ? instance : instance.id;
    const url = `${absolute_url}${id}/`;

    return this.http.put(url, instance, httpOptions).pipe(
      tap(_ => this.log(`updated any id=${id}`)),
      catchError(this.handleError<any>('updateany'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        this.snackBar.open('message error', 'ok', {
          duration: 2000,
        });

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for any consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

  /** Log a anyService message with the MessageService */
  public log(message: string) {
    this.messageService.add('anyService: ' + message);
  }

}
