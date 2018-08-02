// import { Component, OnInit } from '@angular/core';
import { Exhibitor } from './exhibitor';
//
// @Component({
//   selector: 'app-exhibitors',
//   templateUrl: './exhibitors.component.html',
//   styleUrls: ['./exhibitors.component.scss']
// })
// export class ExhibitorsComponent implements OnInit {
//
// 	exhibitors: Exhibitor[];
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





import {Component, OnInit, ViewChild} from '@angular/core';
/*import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';*/
import {ExhibitorService} from '../../services/exhibitor.service';
import * as _ from 'lodash';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-exhibitors',
  templateUrl: './exhibitors.component.html',
  styleUrls: ['./exhibitors.component.scss']
})
export class ExhibitorsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'org_code', 'exh_booth', 'exh_id', 'delete'];
/*  dataSource = new MatTableDataSource();*/

  exhibitors: Exhibitor[];
  constructor(private exhibitorService: ExhibitorService) { }

/*  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;*/

  ngOnInit() {
    // this.getExhibitors();
/*    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;*/
    console.log("data source");
    console.log(this.getExhibitors());
  }

  applyFilter(filterValue: string) {
/*    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }*/
  }

  getExhibitors(): any {
    this.exhibitorService.getExhibitors()
        .subscribe(
        exhibitors => {
          /*this.dataSource.data = exhibitors*/
          this.exhibitors = exhibitors
          var tmpExh: Exhibitor = _.find(exhibitors, (exhibitor) => exhibitor.id == 1 )
          console.log(tmpExh)
        }

    ); //console.log(exhibitors)
  }
  delete(exhibitor: Exhibitor): void {
    this.exhibitors = this.exhibitors.filter(h => h !== exhibitor);
    this.exhibitorService.deleteExhibitor(exhibitor).subscribe();
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
