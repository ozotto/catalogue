import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {MatInputModule, MatFormFieldControl} from '@angular/material';

import { ArtworkService } from '../../../services/artwork.service';
import {ExhibitorService} from '../../../services/exhibitor.service';

import * as moment from 'moment';
import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';


import { Artwork } from '../../../models/artwork';
import {Artist} from '../../../models/artist';
import {Exhibitor} from '../../../models/exhibitor';

import {FileuploadComponent} from '../../../../sys/components/fileupload/fileupload.component';
import {Picture} from '../../../models/pictures';

@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.scss']
})
export class ArtworkDetailComponent implements OnInit {

  uploadedImages: Picture[];

  private artwork: Artwork;
  private isNew: Boolean;

  
  defaultExhibitors: Array<Exhibitor>;
  exhibitorFormControl: FormControl;
  filteredExhibitors: any;

  constructor(
    private route: ActivatedRoute,
    private artworkService: ArtworkService,
    private exhibitorService: ExhibitorService,
    private location: Location,
    private fb: FormBuilder
  ) { 
    
    this.artwork = new Artwork();
    this.route.params.subscribe( params => this.isNew = _.isEmpty(params) );

    //New test
    this.exhibitorFormControl = new FormControl();
  }

  ngOnInit(): void {

    this.getExhibitors();

    if(!this.isNew) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.getArtwork(id);
    }
   
  }

  getArtwork(id): void {
    
    // const id = +this.route.snapshot.paramMap.get('id');
    this.artworkService.getArtwork(id)
      .subscribe(artwork => {
        this.artwork = artwork;
      });

  }

  getExhibitors(): any {
    this.exhibitorService.getExhibitors().subscribe(exhibitors => {
      
      this.defaultExhibitors = exhibitors;
      
      this.exhibitorFormControl.valueChanges.pipe(
        startWith(null),
        map(value => this.filterExhibitor(value)))
        .subscribe(exhibitorsFiltered => {
          this.filteredExhibitors = exhibitorsFiltered;
        });

      this.exhibitorFormControl.setValue(this.artwork.exhibitor.cat_banner)

    }); 

 
  }

  filterExhibitor(val: string): Exhibitor[] {
    var tmpExh = _.filter(this.defaultExhibitors, exhibitor => { 
      return exhibitor.cat_banner.trim().toLowerCase().indexOf(val) != -1; 
    });
    return val ? tmpExh : this.defaultExhibitors;
  }

  searchExhibitor(exhibitor: Exhibitor){
    console.log(exhibitor)
    /*LoggerService.log('Moved to hero with id: ' + hero.id);
    return this.router.navigate([AppConfig.routes.heroes + '/' + hero.id]);*/
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    console.log('test')
    /*this.artworkService.updateArtwork(this.artwork)
      .subscribe(() => this.goBack());*/
  }

  receiveImages($event) {
    this.uploadedImages = $event;
    console.log('uploadedImages gniaaaa');
    console.log($event);
    // console.log(this.uploadedImages);
  }


  /*private _filterExh(name: string): Exhibitor[] {
    const filterValue = name.toLowerCase();
    return this.optionsExh.filter(option => option.cat_banner.toLowerCase().indexOf(filterValue) === 0);
  }*/

//   testdate($event): void {
//     console.log('test');
//     this.artwork.year = $event.value;
//
// //    this.artwork.year = moment($event.value).format('YYYY-MM-DD');
//   }



}


/*      this.myControl.valueChanges
    .startWith(null)
    .subscribe(val => {
      if (val && typeof val !== 'object') {
        this.dataService.search(val).subscribe(results => {
          this.filteredOptions = results;
        });
      }
    });
*/

//https://www.experts-exchange.com/questions/29058919/Angular-Materials-AutoComplete-with-Remote-Data.html 
//https://stackblitz.com/angular/pelkxkenpml?file=app%2Fautocomplete-display-example.ts   
/*    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | User>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );*/


    /*this.myControl.valueChanges
    .startWith(null)
    .subscribe(val => {
      if (val && typeof val !== 'object') {
        this.dataService.search(val).subscribe(results => {
          this.filteredOptions = results;
        });
      }
    });*/
