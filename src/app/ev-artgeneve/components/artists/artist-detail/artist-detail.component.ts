import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatInputModule, MatFormFieldControl} from '@angular/material';

import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';

import {ArtistService} from '../../../services/artist.service';
import {ExhibitorService} from '../../../services/exhibitor.service';

import {Artist} from '../../../models/artist';
import {Exhibitor} from '../../../models/exhibitor';
import {State} from '../../../models/state';
import {StateValues} from '../../../models/state';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {

	private path: any[];
  private isExhibited: Boolean;
  
  private artist: Artist;
  private isNew: Boolean;

  defaultExhibitors: Array<Exhibitor>;
  exhibitorFormControl: FormControl;
  filteredExhibitors: any;

  selectedValue: number;
  states: State[] = StateValues;

  checked = false;

  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private location: Location,
    private artistService: ArtistService,
    private exhibitorService: ExhibitorService,
  ) {

  	this.path = this.router.url.split("/");
    this.isExhibited = (this.path[2] == 'art-exhibited') ? true : false;
    this.route.params.subscribe( params => this.isNew = _.isEmpty(params) );

    this.artist = new Artist();
    this.exhibitorFormControl = new FormControl();
  }

  ngOnInit() {
    if(!this.isNew) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.getArtist(id);
    }

    this.getExhibitors();

  }

  getArtist(id): void {
    this.artistService.getArtist(id).subscribe(artist => {
      this.artist = artist;
      this.selectedValue = this.artist.state.id;
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

      if(!this.isNew){
        this.exhibitorFormControl.setValue(this.artist.exhibitor.cat_banner)  
      }

    }); 

  }

  filterExhibitor(val: string): Exhibitor[] {
    var filteredExh = _.filter(this.defaultExhibitors, exhibitor => { 
      return exhibitor.cat_banner.trim().toLowerCase().indexOf(val) != -1; 
    });
    return val ? filteredExh : this.defaultExhibitors;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if(!this.isNew) {
      this.artistService.updateArtist(this.artist).subscribe(
        () => this.goBack()
      );
    }else{
      console.log(this.artist)
      this.artistService.addArtist(this.artist).subscribe(
        () => this.goBack()
      );
    }
  }

}
