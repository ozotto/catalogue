import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {Observable} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';


import * as _ from 'lodash';
import {AutographService} from '../../services/autograph.service';
import {Autograph} from '../../models/autograph';
import {PermissionsHelper} from '../../../sys/helpers/permissions.helper';
import {AuthorService} from '../../services/author.service';

@Component({
  selector: 'app-autographs',
  providers: [AutographService],
  templateUrl: './autographs.component.html',
  styleUrls: ['./autographs.component.scss']
})
export class AutographsComponent implements OnInit {
  displayedColumns: string[];

  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isSuperUser: Boolean;


  constructor( private autographservice: AutographService, private permissionshelper: PermissionsHelper) {

  }

  ngOnInit() {
    const isSuperUser = this.permissionshelper.showIfSuperUser();
    if (isSuperUser) {
      this.displayedColumns = ['select', 'actions', 'id', 'title', 'author', 'exhibitor', 'booth'];
    } else {
      this.displayedColumns = ['select', 'actions', 'title', 'author', 'exhibitor', 'booth'];
    }
    this.getAutographs();
  }

  getAutographs() {
    this.autographservice.getAutographs().subscribe((autographs) => {
      this.dataSource.data = autographs
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("autographs");
      console.log(autographs);
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

  deleteAutograph(autograph: Autograph) {
    /* TODO: Afficher message confirmation */
    // this.autographs = this.autographs.filter(h => h !== autograph);
    this.autographservice.deleteAutograph(autograph).subscribe();
  }

}

