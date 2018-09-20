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

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ErrorsHelper {
  constructor(
    private messageService: MessageService,
  ) { }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        /*this.snackBar.open('message error', 'ok', {
          duration: 2000,
        });*/

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
