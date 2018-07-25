import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BACKEND_URL } from '../../sys/constants';
import { ServicesHelper } from '../../sys/helpers/services.helper';



@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private absolute_url = BACKEND_URL + '/artgeneve/pictures/';
  constructor(
    private http: HttpClient,
    private serviceHelper: ServicesHelper
  ) { }


  /** GET ArtworkPictures from the server */
  getArtworkPictures (): Observable<any[]> { /* old: getArtworkPictures (): Observable<ArtworkPicture[]> { */
    return this.serviceHelper.getInstances(this.absolute_url);
  }

  /** GET ArtworkPicture by id. Will 404 if id not found */
  getArtworkPicture (instance: any | number): Observable<any> { /* old: getArtworkPicture (instance: ArtworkPicture | number): Observable<ArtworkPicture> { */
    return this.serviceHelper.getInstance(this.absolute_url, instance);
  }

  /** POST: add a new ArtworkPicture to the server */
  addArtworkPicture (instance: any): Observable<any> { /* old: addArtworkPicture (artwork: ArtworkPicture): Observable<ArtworkPicture> { */
    return this.serviceHelper.addInstance(this.absolute_url, instance);
  }

  // /** PUT: update the ArtworkPicture on the server */
  updateArtworkPicture (instance: any): Observable<any> { /* old: updateArtworkPicture (instance: ArtworkPicture): Observable<any> { */
    return this.serviceHelper.updateInstance(this.absolute_url, instance);
  }

  /** DELETE: delete the ArtworkPicture from the server */
  deleteArtworkPicture (instance: any | number): Observable<any> { /* old: deleteArtworkPicture (instance: ArtworkPicture | number): Observable<ArtworkPicture> { */
    return this.serviceHelper.deleteInstance(this.absolute_url, instance);
  }

}
