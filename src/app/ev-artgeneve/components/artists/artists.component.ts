import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';

import { LocalDataSource } from 'ng2-smart-table';
import * as tableData from '../data/data-artists-rep';
//import { BasicExampleLoadService } from '../data/basic-example-load.service';

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  settings = tableData.settings;
  source: LocalDataSource;

  public path: any[];

  private isExhibited: Boolean;
  
  constructor(
    private router : Router,
    private artistService: ArtistService,
	) {
    this.path = this.router.url.split("/");
    this.isExhibited = (this.path[2] == 'art-exhibited') ? true : false;
   
  }



  ngOnInit() {
    this.getArtists();
  }

  getArtists(): any {
    this.artistService.getArtists()
      .subscribe(artists => {
        if(this.isExhibited){
          
          this.source = new LocalDataSource( _.filter(artists, art => { 
            if(art.is_exhibited == true) return art; 
          }) );

        }else{
          this.source = new LocalDataSource( _.filter(artists, art => { 
            if(art.is_exhibited == false) return art; 
          }) );
          /*this.source = new LocalDataSource(artists);*/
        }
        
      }); 
  }

  selectedArtist: Artist;

	onSelectArtist(artist: Artist): void {
	  this.selectedArtist = artist;
	}

}
