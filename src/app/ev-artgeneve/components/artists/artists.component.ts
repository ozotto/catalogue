import { Component, OnInit } from '@angular/core';

import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

	artists: Artist[];

  constructor(
  	private artistService: ArtistService
  	) { }

  ngOnInit() {
  	this.getArtists()
  }

  getArtists(): any {
    this.artistService.getArtists()
      .subscribe(artists => this.artists = artists); 
  }

  selectedArtist: Artist;

	onSelectArtist(artist: Artist): void {
	  this.selectedArtist = artist;
	}

}
