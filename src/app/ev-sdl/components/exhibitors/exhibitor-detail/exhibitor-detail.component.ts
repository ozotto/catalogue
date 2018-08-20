import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import * as _ from 'lodash';

import { Exhibitor } from '../../../models/exhibitor';
import { ExhibitorService } from '../../../services/exhibitor.service';

@Component({
  selector: 'app-exhibitor-detail',
  templateUrl: './exhibitor-detail.component.html',
  styleUrls: ['./exhibitor-detail.component.scss']
})
export class ExhibitorDetailComponent implements OnInit {

  private exhibitor: Exhibitor;
  private isNew: Boolean;

  constructor(
  	private route: ActivatedRoute,
    private exhibitorService: ExhibitorService,
    private location: Location
  ) { 
    this.route.params.subscribe( params => this.isNew = _.isEmpty(params) );

    this.exhibitor = new Exhibitor();
  }

  ngOnInit() {
     if(!this.isNew) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.getExhibitor(id);
    }
  }

  getExhibitor(id): void {
    this.exhibitorService.getExhibitor(id).subscribe(exhibitor => {
      this.exhibitor = exhibitor;
      console.log(this.exhibitor)
    });
  }
  
  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    if(!this.isNew) {
      this.exhibitorService.updateExhibitor(this.exhibitor).subscribe(
        () => this.goBack()
      );
    }
  }

}
