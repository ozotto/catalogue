import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';

import { BACKEND_URL } from '../../sys/constants';
import { ServicesHelper } from '../../sys/helpers/services.helper';



@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private absolute_url = BACKEND_URL + '/artgeneve/artists/';
  constructor(
    private http: HttpClient,
    private serviceHelper: ServicesHelper
  ) { }


  /** GET Artists from the server */
  getArtists (): Observable<any[]> { /* old: getArtists (): Observable<Artist[]> { */
    return this.serviceHelper.getInstances(this.absolute_url);
  }

  /** GET Artist by id. Will 404 if id not found */
  getArtist (instance: any | number): Observable<any> { /* old: getArtist (instance: Artist | number): Observable<Artist> { */
    return this.serviceHelper.getInstance(this.absolute_url, instance);
  }

  /** POST: add a new Artist to the server */
  addArtist (instance: any): Observable<any> { /* old: addArtist (Artist: Artist): Observable<Artist> { */
    return this.serviceHelper.addInstance(this.absolute_url, instance);
  }

  // /** PUT: update the Artist on the server */
  updateArtist (instance: any): Observable<any> { /* old: updateArtist (instance: Artist): Observable<any> { */
    return this.serviceHelper.updateInstance(this.absolute_url, instance);
  }

  /** DELETE: delete the Artist from the server */
  deleteArtist (instance: any | number): Observable<any> { /* old: deleteArtist (instance: Artist | number): Observable<Artist> { */
    return this.serviceHelper.deleteInstance(this.absolute_url, instance);
  }
}