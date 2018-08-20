import {Injectable, NgZone} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

/*import { Exhibitor } from '../components/exhibitors/exhibitor';*/
import {Exhibitor} from '../models/exhibitor';
import { MessageService } from '../../sys/services/message.service';

import {BACKEND_URL} from '../../sys/constants';
import {ServicesHelper} from '../../sys/helpers/services.helper';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ExhibitorService {
  private exhibitorsUrl = 'api/exhibitors';
  private absolute_url = BACKEND_URL + '/exhibitor/exhibitors/';
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private serviceHelper: ServicesHelper
    /*private snackBar: MatSnackBar*/
  ) { }


  /** GET Exhibitors from the server */
  getExhibitors (): Observable<Exhibitor[]> {
    // return this.http.get<Exhibitor[]>(this.exhibitorsUrl)
    //   .pipe(
    //     tap(exhibitors => this.log(`fetched Exhibitors`)),
    //     catchError(this.handleError('getExhibitors', []))
    //   );


    return this.http.get<Exhibitor[]>(BACKEND_URL + '/exhibitor/exhibitors/').pipe(
          tap(exhibitors => this.log(`fetched Exhibitors`)),
          catchError(this.handleError('getExhibitors', []))
        );
      //
      // (res) => {
      // return res;
    // });
  }

  /** GET Exhibitor by id. Will 404 if id not found */
  getExhibitor (instance: any | number): Observable<any> { 
    return this.serviceHelper.getInstance(this.absolute_url, instance);
  }

  /** PUT: update the Exhibitor on the server */
  updateExhibitor2 (instance: any): Observable<any> { 
    return this.serviceHelper.updateInstance(this.absolute_url, instance);
  }

  /** PUT: update the Exhibitor on the server */
  updateExhibitor (exhibitor: Exhibitor): Observable<any> {
    console.log('update')
    console.log(exhibitor)
    const url = this.absolute_url + exhibitor.id;
    return this.http.put(url, exhibitor, httpOptions).pipe(
      tap(_ => this.log(`updated Exhibitor id=${exhibitor.id}`)),
      catchError(this.handleError<any>('updateExhibitor'))
    );
  }

  // /** GET Exhibitor by id. Return `undefined` when id not found */
  // getExhibitorNo404<Data>(id: number): Observable<Exhibitor> {
  //   const url = `${this.exhibitorsUrl}/?id=${id}`;
  //   return this.http.get<Exhibitor[]>(url)
  //     .pipe(
  //       map(exhibitors => exhibitors[0]), // returns a {0|1} element array
  //       tap(h => {
  //         const outcome = h ? `fetched` : `did not find`;
  //         this.log(`${outcome} Exhibitor id=${id}`);
  //       }),
  //       catchError(this.handleError<Exhibitor>(`getExhibitor id=${id}`))
  //     );
  // }
  //
  // /** GET Exhibitor by id. Will 404 if id not found */
  /*getExhibitor(id: number): Observable<Exhibitor> {
    const url = `${this.exhibitorsUrl}/${id}`;
    return this.http.get<Exhibitor>(url).pipe(
      tap(_ => this.log(`fetched Exhibitor id=${id}`)),
      catchError(this.handleError<Exhibitor>(`getExhibitor id=${id}`))
    );
  }*/
  //

  //
  // //////// Save methods //////////
  //
  // /** POST: add a new Exhibitor to the server */
  // addExhibitor (exhibitor: Exhibitor): Observable<Exhibitor> {
  //   return this.http.post<Exhibitor>(this.exhibitorsUrl, exhibitor, httpOptions).pipe(
  //     tap((exhibitor: Exhibitor) => this.log(`added Exhibitor w/ id=${exhibitor.id}`)),
  //     catchError(this.handleError<Exhibitor>('addExhibitor'))
  //   );
  // }
  //
  /** DELETE: delete the Exhibitor from the server */
  // deleteExhibitor (exhibitor: Exhibitor | number): Observable<Exhibitor> {
  //   const id = typeof exhibitor === 'number' ? exhibitor : exhibitor.id;
  //   const url = `${this.exhibitorsUrl}/${id}`;
  //
  //   return this.http.delete<Exhibitor>(url, httpOptions).pipe(
  //     tap(_ => this.log(`deleted Exhibitor id=${id}`)),
  //     catchError(this.handleError<Exhibitor>('deleteExhibitor'))
  //   );
  //
  //
  //   return this.http.delete<Exhibitor[]>(BACKEND_URL + '/exhibitor/exhibitors/{id}/').pipe(
  //     tap(exhibitors => this.log(`fetched Exhibitors`)),
  //     catchError(this.handleError('deleteExhibitors', []))
  //   );
  // }


  /** DELETE: delete the Exhibitor from the server */
  deleteExhibitor (exhibitor: Exhibitor | number): Observable<Exhibitor> {
    const id = typeof exhibitor === 'number' ? exhibitor : exhibitor.id;
    const endpoint = '/exhibitor/exhibitors/';
    const url = `${BACKEND_URL}${endpoint}${id}/`;

    return this.http.delete<Exhibitor>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Exhibitor id=${id}`)),
      catchError(this.handleError<Exhibitor>('deleteExhibitor'))
    );
  }




  

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      /*this.snackBar.open('message error', 'ok', {
        duration: 2000,
      });*/

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for Exhibitor consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ExhibitorService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ExhibitorService: ' + message);
  }

}