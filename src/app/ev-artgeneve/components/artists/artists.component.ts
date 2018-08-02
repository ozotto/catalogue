import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

	artists: Artist[];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'banner', 'name', 'firstName'];

  constructor(
  	private artistService: ArtistService
  	) { }

  ngOnInit() {
  	this.getArtists()
  }

  getArtists(): any {
    this.artistService.getArtists()
      .subscribe(artists => {
        this.artists = artists
        this.dataSource.data = artists
      }); 
  }

  selectedArtist: Artist;

	onSelectArtist(artist: Artist): void {
	  this.selectedArtist = artist;
	}

}
