import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {Observable} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';

import {PicturesService} from '../../services/picture.service';
import {Picture} from '../../models/pictures';

import * as _ from 'lodash';

@Component({
  selector: 'app-galeries',
  providers: [PicturesService],
  templateUrl: './galeries.component.html',
  styleUrls: ['./galeries.component.scss']
})
export class GaleriesComponent implements OnInit {

	displayedColumns: string[] = ['select', 'actions', 'id', 'image', 'artwork'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private picturesService: PicturesService ) { 
  	
  }

  ngOnInit() {
    this.configureDataSource()
    this.getGaleries()
  }

  getGaleries() {
    this.picturesService.getArtworkPictures().subscribe((galeries) => {
      this.dataSource.data = galeries
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  configureDataSource() {
    /* configure filter */
    
    /* configure sort */
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

}
