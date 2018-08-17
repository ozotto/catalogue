import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {Observable} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';

import {ArtworkService} from '../../services/artwork.service';
import {Artwork} from '../../models/artwork';

import * as _ from 'lodash';

@Component({
  selector: 'app-artworks',
  providers: [ArtworkService],
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss']
})
export class ArtworksComponent implements OnInit {

  displayedColumns: string[] = ['select', 'actions', 'id', 'exhibitor', 'title', 'artist', 'state'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private artworkService: ArtworkService ) {

  }

  ngOnInit() {
    this.configureDataSource()
    this.getArtworks()
  }

  getArtworks() {
    this.artworkService.getArtworks().subscribe((artworks) => {
      this.dataSource.data = artworks
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  configureDataSource() {
    /* configure filter */
    this.dataSource.filterPredicate = (data: Artwork, filter: string) => 
      data.exhibitor.cat_banner.trim().toLowerCase().indexOf(filter) != -1 || data.title.trim().toLowerCase().indexOf(filter) != -1 ||
      data.artist.first_name.trim().toLowerCase().indexOf(filter) != -1 || data.artist.last_name.trim().toLowerCase().indexOf(filter) != -1 || 
      data.state.title.trim().toLowerCase().indexOf(filter) != -1 ;
    
    /* configure sort */
    this.dataSource.sortingDataAccessor = (data: Artwork, property) => {
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

  deleteArtwork(artwork: Artwork) {
    console.log('delete')
    /*
    TODO ---
    this.artworks = this.artworks.filter(h => h !== artwork);
    this.artworkService.deleteArtwork(artwork).subscribe();*/
  }

}

  

/*  
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  applyFilter(filterValue: string) { //TODO: https://codehandbook.org/how-to-implement-auto-complete-in-angular-4/
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

this.getAllArtworksData().subscribe(res => {
        //this.vendorList = this.getUniqueArray(this.vendorList);
        this.vendorList = this.vendorList;
        this.settings = this.tableSettings();
    });

tableSettings() {
    return {
        columns: {
            id: {
              title: 'ID',
              filter: false,
              addable: false, 
              editable: false
            },
            exhibitor: {
                title: 'exhibitor',
                 filterFunction(cell?: any, search?: string): boolean {
                  
                  const match = cell.cat_banner.indexOf(search) > -1;
                  if (match || search === '') {
                    console.log(cell.cat_banner)
                    return true;
                  } else {
                    return false;
                  }
                },
                valuePrepareFunction: (cell, row) => row.exhibitor.cat_banner

                valuePrepareFunction: (exhibitor) => {
                    return exhibitor.cat_banner;
                    //return exhibitor.map(s => " " + s.cat_banner + " ").toString()

                },
                filterFunction(exhibitor?: any, search?: string): boolean {
                  
                  let  match = exhibitor.cat_banner.indexOf(search) > -1;
                    console.log(o)
                    return o.cat_banner == search; 
                  });
                  if (match || search === '') {
                    return true;
                  } else {
                    return false;
                  }
                },
                editor: {
                    type: 'list',
                    config: {
                        selectText: 'Select...',
                        list: this.vendorList,
                    },
                },
                filter: {
                    type: 'list',
                    config: {
                        selectText: 'All',
                        list: this.vendorList,
                    },
                }
            },
            title: {
              title: 'Title',
              filter: false,
            },
            artist: {
              title: 'Artist',
              valuePrepareFunction: (artist) => {
                return artist.first_name + " " +artist.last_name;
              },
              filter: false,
            },
            state: {
              title: 'Validation',
              valuePrepareFunction: (state) => {
                return state.title;
              },
              sort : false,
              filter: {
                type: 'list',
                config: {
                  selectText: 'Select...',
                  list: [
                    { value: 1, title: 'Publie' },
                    { value: 2, title: 'Brouillon' },
                    { value: 3, title: 'En attente de validation' },
                  ],
                },
              }
            }
        }
    };
}

  getAllArtworksData() {
    return Observable.create(observable => {
        this.artworkService.getArtworks().subscribe(res => {
            if (res.length) {
              console.log(res)
                res.forEach((element, index) => {
                    this.vendorList.push({ value: element.exhibitor.id, title: element.exhibitor.cat_banner });
                    element.sr = index + 1;
                });
            }
            this.allClientsData = new LocalDataSource(res);
            observable.next(true);
            return observable.complete();
        });
    });
}*/

