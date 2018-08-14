import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';

import { BACKEND_URL } from '../../sys/constants';
import { ServicesHelper } from '../../sys/helpers/services.helper';


import {ExhibitorService} from './exhibitor.service';
import {ArtistService} from './artist.service';

/*import { Artwork } from '../models/artwork';*/

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private absolute_url = BACKEND_URL + '/artgeneve/artworks/';
  private url_exh = BACKEND_URL + '/exhibitor/exhibitors/';


  artworks: any[];

  constructor(
    private http: HttpClient,
    private serviceHelper: ServicesHelper,
    private exhibitorService: ExhibitorService,
    private artistService : ArtistService
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

/*  this.artworkService.getApplicationArtworks()
      .subscribe(artworks => {
        console.log(artworks)
        this.source = new LocalDataSource(artworks);
      }); */


/*  getListApplicationArtworks(): Observable<any[]> {
      
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin(
          this.getArtworks(),
          this.artistService.getArtists(),
          this.exhibitorService.getExhibitors()
        )
        /*.map( (artworks, artists, exhibitors) => {

        } )*/


    //}

}
