import { Component, OnInit } from '@angular/core';
/*import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';*/

import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';

import { LocalDataSource } from 'ng2-smart-table';
import * as tableData from '../data/data-artists-rep';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

	/*dataSource = new MatTableDataSource();*/
  displayedColumns: string[] = ['id', 'banner', 'name', 'firstName'];

  source: LocalDataSource;

  constructor(
	private artistService: ArtistService
	) {
    this.getArtists()
  }

  settings = tableData.settings;

  ngOnInit() {
  	this.getArtists()
  }

  getArtists(): any {
    this.artistService.getArtists()
      .subscribe(artists => {
        this.source = new LocalDataSource(artists);
      }); 
  }

  selectedArtist: Artist;

	onSelectArtist(artist: Artist): void {
	  this.selectedArtist = artist;
	}

}
