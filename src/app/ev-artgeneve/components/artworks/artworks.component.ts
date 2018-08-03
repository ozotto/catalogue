import {Component, OnInit, ViewChild} from '@angular/core';

import {ArtworkService} from '../../services/artwork.service';
import {Artwork} from '../../models/artwork';

import { LocalDataSource } from 'ng2-smart-table';
import * as tableData from '../data/data-app-art';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss']
})
export class ArtworksComponent implements OnInit {

  source: LocalDataSource;

  constructor(
    private artworkService: ArtworkService
  ) {
    this.getArtworks()
    this.source = new LocalDataSource(tableData.data); 
  }

  settings = tableData.settings;

  ngOnInit() {
  }

  applyFilter(filterValue: string) { //TODO: https://codehandbook.org/how-to-implement-auto-complete-in-angular-4/
    /*this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }*/
  }

  getArtworks(): any {
    this.artworkService.getArtworks()
      .subscribe(artworks => {
        this.source = new LocalDataSource(artworks);
      }); 
  }

  /*deleteArtwork(artwork: Artwork): void {
    this.artworks = this.artworks.filter(h => h !== artwork);
    this.artworkService.deleteArtwork(artwork).subscribe();
  }*/

}


// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-artworks',
//   templateUrl: './artworks.component.html',
//   styleUrls: ['./artworks.component.scss']
// })
// export class ArtworksComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }
