import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {MatInputModule, MatFormFieldControl} from '@angular/material';

import * as moment from 'moment';
import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';

import {AnimationService} from '../../../services/animations.service';
import {ExhibitorService} from '../../../services/exhibitor.service';
import {AuthorService} from '../../../services/authors.service';

import {Animation} from '../../../models/animation';
import {Exhibitor} from '../../../models/exhibitor';
import {Author} from '../../../models/author';
import {State} from '../../../models/state';
import {StateValues} from '../../../models/state';

import {FileuploadComponent} from '../../../../sys/components/fileupload/fileupload.component';


@Component({
  selector: 'app-animation-detail',
  templateUrl: './animation-detail.component.html',
  styleUrls: ['./animation-detail.component.scss']
})
export class AnimationDetailComponent implements OnInit {

  private animation: Animation;
  private isNew: Boolean;

  defaultExhibitors: Array<Exhibitor>;
  exhibitorFormControl: FormControl;
  filteredExhibitors: any;

  defaultAuthors: Array<Author>;
  authorFormControl: FormControl;
  filteredAuthors: any;

  selectedValue: number;
  states: State[] = StateValues;

  constructor(
    private route: ActivatedRoute,
    private animationService: AnimationService,
    private exhibitorService: ExhibitorService,
    private authorService: AuthorService,
    private location: Location,
    private fb: FormBuilder
  ) { 
    
    this.route.params.subscribe( params => this.isNew = _.isEmpty(params) );

    this.animation = new Animation();
    this.exhibitorFormControl = new FormControl();
    this.authorFormControl = new FormControl();
  }

  ngOnInit(): void {

    if(!this.isNew) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.getAnimation(id);
    }

    this.getExhibitors();
    this.getAuthors();
   
  }

  getAnimation(id): void {
    
    // const id = +this.route.snapshot.paramMap.get('id');
    this.animationService.getArtwork(id)
      .subscribe(animation => {
        this.animation = animation;
        this.selectedValue = this.animation.state.id;
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

      this.exhibitorFormControl.setValue(this.animation.exhibitor.cat_banner)

    }); 

  }

  getAuthors(): any {
    this.authorService.getArtists().subscribe(authors => {
      
      this.defaultAuthors = authors;
      
      this.authorFormControl.valueChanges.pipe(
        startWith(null),
        map(value => this.filterArtist(value)))
        .subscribe(artistsFiltered => {
          this.filteredAuthors = artistsFiltered;
        });

      if(this.animation.artist.first_name == undefined){
        console.log('ohh')
      }
      this.authorFormControl.setValue(this.animation.artist.first_name + ' ' +this.animation.artist.last_name)
      
    }); 
  }


  filterExhibitor(val: string): Exhibitor[] {
    var filteredExh = _.filter(this.defaultExhibitors, exhibitor => { 
      return exhibitor.cat_banner.trim().toLowerCase().indexOf(val) != -1; 
    });
    return val ? filteredExh : this.defaultExhibitors;
  }

  filterArtist(val: string): Author[] {
    var filteredArt = _.filter(this.defaultAuthors, artist => { 
      return artist.first_name.trim().toLowerCase().indexOf(val) != -1 || artist.last_name.trim().toLowerCase().indexOf(val) != -1; 
    });
    return val ? filteredArt : this.defaultAuthors;
  }

  searchExhibitor(exhibitor: Exhibitor){
    console.log(exhibitor)
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    console.log('test')
  }

}
