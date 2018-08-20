import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {Observable} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';

import {Exhibitor} from '../../models/exhibitor';
import {ExhibitorService} from '../../services/exhibitor.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-exhibitors',
  providers: [ExhibitorService],
  templateUrl: './exhibitors.component.html',
  styleUrls: ['./exhibitors.component.scss']
})
export class ExhibitorsComponent implements OnInit {
  displayedColumns: string[] = ['select', 'actions', 'id', 'stand', 'state'];
  
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  constructor( private exhibitorService: ExhibitorService) {
    
  }

  ngOnInit() {
    this.configureDataSource()
    this.getExhibitors()
  }

  getExhibitors() {
    this.exhibitorService.getExhibitors().subscribe((exhibitors) => {
      this.dataSource.data = exhibitors
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  configureDataSource() {
    /* TODO - configure filter */
    
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
  
  deleteExhibitor(exhibitor: Exhibitor) {
    console.log('delete')
    /*
    TODO ---
    this.exhibitors = this.exhibitors.filter(h => h !== exhibitor);
    this.exhibitorService.deleteExhibitor(exhibitor).subscribe();*/
  }

}
















//
// import {Component} from '@angular/core';
//
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
//
// const ELEMENT_DATA: PeriodicElement[] = [
//   {id: 1, org_code: 'Hydrogen', exh_booth: 1.0079, exh_id: 'H'},
//   {id: 2, org_code: 'Helium', exh_booth: 4.0026, exh_id: 'He'},
//   {id: 3, org_code: 'Lithium', exh_booth: 6.941, exh_id: 'Li'},
//   {id: 4, org_code: 'Beryllium', exh_booth: 9.0122, exh_id: 'Be'},
//   {id: 5, org_code: 'Boron', exh_booth: 10.811, exh_id: 'B'},
//   {id: 6, org_code: 'Carbon', exh_booth: 12.0107, exh_id: 'C'},
//   {id: 7, org_code: 'Nitrogen', exh_booth: 14.0067, exh_id: 'N'},
//   {id: 8, org_code: 'Oxygen', exh_booth: 15.9994, exh_id: 'O'},
//   {id: 9, org_code: 'Fluorine', exh_booth: 18.9984, exh_id: 'F'},
//   {id: 10, org_code: 'Neon', exh_booth: 20.1797, exh_id: 'Ne'},
// ];
//
// /**
//  * @title Basic use of `<table mat-table>`
//  */
// @Component({
//   selector: 'app-exhibitors',
//   templateUrl: './exhibitors.component.html',
//   styleUrls: ['./exhibitors.component.scss']
// })
// export class ExhibitorsComponent {
//   displayedColumns: string[] = ['id', 'org code', 'exh booth', 'exh id'];
//   dataSource = ELEMENT_DATA;
// }
//
//
//
//
//
//



















  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.exhibitorService.addExhibitor({ name } as Exhibitor)
  //     .subscribe(exhibitor => {
  //       this.exhibitors.push(exhibitor);
  //     });
  // }
  //
  // delete(exhibitor: Exhibitor): void {
  //   this.exhibitors = this.exhibitors.filter(h => h !== exhibitor);
  //   this.exhibitorService.deleteExhibitor(exhibitor).subscribe();
  // }
//
// }



//
// @Component({
//   selector: 'app-exhibitors',
//   templateUrl: './exhibitors.component.html',
//   styleUrls: ['./exhibitors.component.scss']
// })
// export class ExhibitorsComponent implements OnInit {
//
//   exhibitors: Exhibitor[];
//
//   constructor(private exhibitorService: ExhibitorService) { }
//
//   ngOnInit() {
//     this.getExhibitors();
//   }
//
//   getExhibitors(): void {
//     this.exhibitorService.getExhibitors()
//         .subscribe(exhibitors => this.exhibitors = exhibitors); //console.log(exhibitors)
//   }





