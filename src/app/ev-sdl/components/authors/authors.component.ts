import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

import {Observable} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';

import {AuthorService} from '../../services/authors.service';
import {Author} from '../../models/author';

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-authors',
  providers: [AuthorService],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'actions', 'id', 'exhibitor', 'artist', 'state'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private path: any[];
  private isExhibited: Boolean;

  constructor(
    private router : Router,
    private authorService: AuthorService,
	) {
    this.path = this.router.url.split("/");
    this.isExhibited = (this.path[2] == 'art-exhibited') ? true : false;
  }

  ngOnInit() {
    this.configureDataSource()
    this.getAuthors();
  }

  getAuthors(): any {
    this.authorService.getArtists().subscribe(authors => {
      this.dataSource.data = authors;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
        
    }); 
  }

  configureDataSource() {
    /* configure filter */
    this.dataSource.filterPredicate = (data: Author, filter: string) => 
      data.exhibitor.cat_banner.trim().toLowerCase().indexOf(filter) != -1 || data.state.title.trim().toLowerCase().indexOf(filter) != -1 ||
      data.first_name.trim().toLowerCase().indexOf(filter) != -1 || data.last_name.trim().toLowerCase().indexOf(filter) != -1 ;
    
    /* configure sort */
    this.dataSource.sortingDataAccessor = (data: Author, property) => {
      switch(property) {
        case 'exhibitor': return data.exhibitor.cat_banner;
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
  
  deleteAuthor(author: Author) {
    
    this.dataSource.data = this.dataSource.data.filter(h => h !== author);
    this.authorService.deleteArtist(author).subscribe();
  }
  
}
