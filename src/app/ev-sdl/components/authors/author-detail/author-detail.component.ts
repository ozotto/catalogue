import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatInputModule, MatFormFieldControl} from '@angular/material';

import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';

import {AuthorService} from '../../../services/authors.service';
import {ExhibitorService} from '../../../services/exhibitor.service';

import {Author} from '../../../models/author';
import {Exhibitor} from '../../../models/exhibitor';
import {State} from '../../../models/state';
import {StateValues} from '../../../models/state';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit {

	private path: any[];
  private isExhibited: Boolean;
  
  private author: Author;
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
    private authorService: AuthorService,
    private exhibitorService: ExhibitorService,
  ) {

  	this.path = this.router.url.split("/");
    this.isExhibited = (this.path[2] == 'art-exhibited') ? true : false;
    this.route.params.subscribe( params => this.isNew = _.isEmpty(params) );

    this.author = new Author();
    this.exhibitorFormControl = new FormControl();
  }

  ngOnInit() {
    if(!this.isNew) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.getAuthor(id);
    }

    this.getExhibitors();

  }

  getAuthor(id): void {
    this.authorService.getArtist(id).subscribe(artist => {
      this.author = artist;
      this.selectedValue = this.author.state.id;
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
        this.exhibitorFormControl.setValue(this.author.exhibitor.cat_banner)  
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
      this.authorService.updateArtist(this.author).subscribe(
        () => this.goBack()
      );
    }else{
      console.log(this.author)
      this.authorService.addArtist(this.author).subscribe(
        () => this.goBack()
      );
    }
  }

}
