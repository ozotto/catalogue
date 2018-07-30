import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ArtworkService } from '../../../services/artwork.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

import { Artwork } from '../../../models/artwork';
import {Artist} from '../../../models/artist';
import {FileuploadComponent} from '../../../../sys/components/fileupload/fileupload.component';
import {Picture} from '../../../models/pictures';



@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.scss']
})
export class ArtworkDetailComponent implements OnInit {

  uploadedImages: Picture[];

  //@Input() artwork: any;

  private artwork: Artwork;
  private isNew: Boolean;

  constructor(
    private route: ActivatedRoute,
    private artworkService: ArtworkService,
    private location: Location
  ) { 
    this.artwork = new Artwork();
    this.route.params.subscribe( params => this.isNew = _.isEmpty(params) );
  }

  ngOnInit(): void {

    if(!this.isNew) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.getArtwork(id);
    }

  }

  getArtwork(id): void {
    console.log('here')
    // const id = +this.route.snapshot.paramMap.get('id');
    this.artworkService.getArtwork(id)
      .subscribe(artwork => {
        this.artwork = artwork;
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.artworkService.updateArtwork(this.artwork)
      .subscribe(() => this.goBack());
  }

  receiveImages($event) {
    this.uploadedImages = $event;
    console.log('uploadedImages gniaaaa');
    console.log($event);
    // console.log(this.uploadedImages);
  }


//   testdate($event): void {
//     console.log('test');
//     this.artwork.year = $event.value;
//
// //    this.artwork.year = moment($event.value).format('YYYY-MM-DD');
//   }



}
