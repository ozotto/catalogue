import {Injectable, NgZone} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


import { MessageService } from '../../sys-services/message.service';
import {BACKEND_URL} from '../../sys-others/constants';
import {MatSnackBar} from '@angular/material';
import {Artwork} from '../artworks/artwork';
import {ServicesHelper} from '../../sys-helpers/services.helper';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }) //TODO: remove des que tout est dans service helper
};

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private absolute_url = BACKEND_URL + '/artgeneve/artworks/';
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private serviceHelper: ServicesHelper
  ) { }


  /** GET Exhibitors from the server */
  getArtworks (): Observable<Artwork[]> {
    return this.serviceHelper.getInstances(this.absolute_url);
  }

  /** GET Exhibitor by id. Will 404 if id not found */
  getArtwork (instance: Artwork | number): Observable<Artwork> {
    return this.serviceHelper.getInstance(this.absolute_url, instance);
  }

  /** DELETE: delete the Artwork from the server */
  deleteArtwork (instance: Artwork | number): Observable<Artwork> {
    return this.serviceHelper.deleteInstance(this.absolute_url, instance);
  }

  // /** POST: add a new Exhibitor to the server */
  // addArtwork (artwork: Artwork): Observable<Artwork> {
  //   return this.http.post<Artwork>(this.artworksUrl, artwork, httpOptions).pipe(
  //     tap((artwork: Artwork) => this.log(`added Artwork w/ id=${artwork.id}`)),
  //     catchError(this.handleError<Artwork>('addArtwork'))
  //   );
  // }

  // /** PUT: update the Exhibitor on the server */
  updateArtwork (instance: Artwork): Observable<any> {
    return this.serviceHelper.updateInstance(this.absolute_url, instance);
  }

}
