import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BACKEND_URL } from '../../sys/constants';
import { ServicesHelper } from '../../sys/helpers/services.helper';



@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private absolute_url = BACKEND_URL + '/artgeneve/artworks/';
  constructor(
    private http: HttpClient,
    private serviceHelper: ServicesHelper
  ) { }


  /** GET Artworks from the server */
  getArtworks (): Observable<any[]> { /* old: getArtworks (): Observable<Artwork[]> { */
    return this.serviceHelper.getInstances(this.absolute_url);
  }

  /** GET Artwork by id. Will 404 if id not found */
  getArtwork (instance: any | number): Observable<any> { /* old: getArtwork (instance: Artwork | number): Observable<Artwork> { */
    return this.serviceHelper.getInstance(this.absolute_url, instance);
  }

  /** POST: add a new Artwork to the server */
  addArtwork (instance: any): Observable<any> { /* old: addArtwork (artwork: Artwork): Observable<Artwork> { */
    return this.serviceHelper.addInstance(this.absolute_url, instance);
  }

  // /** PUT: update the Artwork on the server */
  updateArtwork (instance: any): Observable<any> { /* old: updateArtwork (instance: Artwork): Observable<any> { */
    return this.serviceHelper.updateInstance(this.absolute_url, instance);
  }

  /** DELETE: delete the Artwork from the server */
  deleteArtwork (instance: any | number): Observable<any> { /* old: deleteArtwork (instance: Artwork | number): Observable<Artwork> { */
    return this.serviceHelper.deleteInstance(this.absolute_url, instance);
  }
}
