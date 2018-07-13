import {Injectable, NgZone} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


import { MessageService } from '../../sys-services/message.service';
import {BACKEND_URL} from '../../sys-others/constants';
import {MatSnackBar} from '@angular/material';
import {Artwork} from '../artworks/artwork';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private absolute_url = BACKEND_URL + '/artgeneve/artworks/';
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private snackBar: MatSnackBar
  ) { }


  /** GET Exhibitors from the server */
  getArtworks (): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(this.absolute_url).pipe(
          tap(artworks => this.log(`fetched Artwork`)),
          catchError(this.handleError('getArtwork', []))
        );
  }
  /** GET Exhibitor by id. Will 404 if id not found */
  getArtwork(artwork: Artwork | number): Observable<Artwork> {
    const id = typeof artwork === 'number' ? artwork : artwork.id;
    const url = `${this.absolute_url}${id}/`;
    return this.http.get<Artwork>(url).pipe(
      tap(_ => this.log(`fetched Artwork id=${id}`)),
      catchError(this.handleError<Artwork>(`getArtwork id=${id}`))
    );
  }

  /** DELETE: delete the Artwork from the server */
  deleteArtwork (artwork: Artwork | number): Observable<Artwork> {
    const id = typeof artwork === 'number' ? artwork : artwork.id;
    const url = `${this.absolute_url}${id}/`;

    return this.http.delete<Artwork>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Artwork id=${id}`)),
      catchError(this.handleError<Artwork>('deleteArtwork'))
    );
  }

  // /** POST: add a new Exhibitor to the server */
  // addArtwork (artwork: Artwork): Observable<Artwork> {
  //   return this.http.post<Artwork>(this.artworksUrl, artwork, httpOptions).pipe(
  //     tap((artwork: Artwork) => this.log(`added Artwork w/ id=${artwork.id}`)),
  //     catchError(this.handleError<Artwork>('addArtwork'))
  //   );
  // }

  /** PUT: update the Exhibitor on the server */
  updateArtwork (artwork: Artwork): Observable<any> {
    const id = typeof artwork === 'number' ? artwork : artwork.id;
    const url = `${this.absolute_url}${id}/`;

    return this.http.put(url, artwork, httpOptions).pipe(
      tap(_ => this.log(`updated Artwork id=${id}`)),
      catchError(this.handleError<any>('updateArtwork'))
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

      this.snackBar.open('message error', 'ok', {
        duration: 2000,
      });

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for Artwork consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ArtworkService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ArtworkService: ' + message);
  }

}
