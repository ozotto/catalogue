import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {Observable} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';

import {AnimationService} from '../../services/animations.service';
import {Animation} from '../../models/animation';

import * as _ from 'lodash';

@Component({
  selector: 'app-animations',
  providers: [AnimationService],
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss']
})
export class AnimationsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'actions', 'id', 'exhibitor', 'title', 'artist', 'state'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private animationService: AnimationService ) {

  }

  ngOnInit() {
    this.configureDataSource()
    this.getAnimations()
  }

  getAnimations() {
    this.animationService.getArtworks().subscribe((animations) => {
      this.dataSource.data = animations
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  configureDataSource() {
    /* configure filter */
    this.dataSource.filterPredicate = (data: Animation, filter: string) => 
      data.exhibitor.cat_banner.trim().toLowerCase().indexOf(filter) != -1 || data.title.trim().toLowerCase().indexOf(filter) != -1 ||
      data.artist.first_name.trim().toLowerCase().indexOf(filter) != -1 || data.artist.last_name.trim().toLowerCase().indexOf(filter) != -1 || 
      data.state.title.trim().toLowerCase().indexOf(filter) != -1 ;
    
    /* configure sort */
    this.dataSource.sortingDataAccessor = (data: Animation, property) => {
      switch(property) {
        case 'exhibitor': return data.exhibitor.cat_banner;
        case 'artist': return data.artist.first_name;
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

  onRowClicked(row) {
    console.log('Row clicked: ', row);
    /*TODO ---*/
  }

  deleteArtwork(animation: Animation) {
    console.log('delete')
    /*
    TODO ---
    this.artworks = this.artworks.filter(h => h !== artwork);
    this.animationService.deleteArtwork(artwork).subscribe();*/
  }

}