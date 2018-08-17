import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';

import {Observable} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';

import {ArtistService} from '../../services/artist.service';
import {Artist} from '../../models/artist';

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-artists',
  providers: [ArtistService],
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'actions', 'id', 'exhibitor', 'artist', 'state'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private path: any[];
  private isExhibited: Boolean;

  constructor(
    private router : Router,
    private artistService: ArtistService,
	) {
    this.path = this.router.url.split("/");
    this.isExhibited = (this.path[2] == 'art-exhibited') ? true : false;
  }

  ngOnInit() {
    this.configureDataSource()
    this.getArtists();
  }

  getArtists(): any {
    this.artistService.getArtists().subscribe(artists => {
      if(this.isExhibited){
        this.dataSource.data = _.filter(artists, art => { 
          if(art.is_exhibited == true) return art; 
        }) ;
      }else{
        this.dataSource.data = _.filter(artists, art => { 
          if(art.is_exhibited == false) return art; 
        }) ;
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
        
    }); 
  }

  configureDataSource() {
    /* configure filter */
    this.dataSource.filterPredicate = (data: Artist, filter: string) => 
      data.exhibitor.cat_banner.trim().toLowerCase().indexOf(filter) != -1 || data.state.title.trim().toLowerCase().indexOf(filter) != -1 ||
      data.first_name.trim().toLowerCase().indexOf(filter) != -1 || data.last_name.trim().toLowerCase().indexOf(filter) != -1 ;
    
    /* configure sort */
    this.dataSource.sortingDataAccessor = (data: Artist, property) => {
      switch(property) {
        case 'exhibitor': return data.exhibitor.cat_banner;
        case 'artist': return data.first_name;
        case 'state': return data.state.title;
        default: return data[property];
      }
    };
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) { 
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  /*selectedArtist: Artist;
	onSelectArtist(artist: Artist): void {
	  this.selectedArtist = artist;
	}*/

}
