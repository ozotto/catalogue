import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {Observable} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';

import {Exhibitor} from '../../models/exhibitor';
import {ExhibitorService} from '../../services/exhibitor.service';

import * as _ from 'lodash';
import {PermissionsHelper} from '../../../sys/helpers/permissions.helper';

@Component({
  selector: 'app-exhibitors',
  providers: [ExhibitorService],
  templateUrl: './exhibitors.component.html',
  styleUrls: ['./exhibitors.component.scss']
})
export class ExhibitorsComponent implements OnInit {
  displayedColumns: string[];

  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isSuperUser: Boolean;

  constructor( private exhibitorService: ExhibitorService, private permissionshelper: PermissionsHelper) {

  }

  ngOnInit() {
    const isSuperUser = this.permissionshelper.showIfSuperUser();
    if (isSuperUser) {
      this.displayedColumns = ['select', 'actions', 'id', 'stand', 'banner', 'state'];
    } else {
      this.displayedColumns = ['select', 'actions', 'id', 'stand', 'banner']
    }

    this.configureDataSource()
    this.getExhibitors()

    console.log("isSuperUser");
    console.log(isSuperUser);
  }

  getExhibitors() {
    this.exhibitorService.getExhibitors().subscribe((exhibitors) => {
      this.dataSource.data = exhibitors
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("exhibitors");
      console.log(exhibitors);
    });
  }


  configureDataSource() {
    /* TODO - configure filter */
    this.dataSource.filterPredicate = (data: Exhibitor, filter: string) =>
      data.exhibitor.exh_booth.trim().toLowerCase().indexOf(filter) !== -1 ||
      data.exhibitor.cat_banner.trim().toLowerCase().indexOf(filter) !== -1 ||
      data.exhibitor.exh_account_name.trim().toLowerCase().indexOf(filter) !== -1 ;

    /* TODO - configure sort */

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

