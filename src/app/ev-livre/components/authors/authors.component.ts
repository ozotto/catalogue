import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {Observable} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';


import * as _ from 'lodash';
import {AuthorService} from '../../services/author.service';
import {Author} from '../../models/author';
import {PermissionsHelper} from '../../../sys/helpers/permissions.helper';

@Component({
  selector: 'app-authors',
  providers: [AuthorService],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  displayedColumns: string[];

  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isSuperUser: Boolean;

  constructor( private authorservice: AuthorService, private permissionshelper: PermissionsHelper) {

  }

  ngOnInit() {
    const isSuperUser = this.permissionshelper.showIfSuperUser();
    if (isSuperUser) {
      this.displayedColumns = ['select', 'actions', 'id', 'first_name', 'last_name', 'is_validated'];
    } else {
      this.displayedColumns = ['select', 'actions', 'first_name', 'last_name'];
    }
    this.getAuthors()
  }

  getAuthors() {
    this.authorservice.getAuthors().subscribe((authors) => {
      this.dataSource.data = authors
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("authors");
      console.log(authors);
    });
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
    /* TODO: Afficher message confirmation */
    // this.authors = this.authors.filter(h => h !== author);
    this.authorservice.deleteAuthor(author).subscribe();
  }

}

