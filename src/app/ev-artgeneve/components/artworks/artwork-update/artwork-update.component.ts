import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ArtworkService } from '../../../services/artwork.service';
import * as moment from 'moment';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

import { Artwork } from '../../../models/artwork';
import {Artist} from '../../../models/artist';
import {FileuploadComponent} from '../../../../sys/components/fileupload/fileupload.component';
import {Picture} from '../../../models/pictures';



@Component({
  selector: 'app-artwork-update',
  templateUrl: '../shared/artwork-form.component.html',
  styleUrls: ['../shared/artwork-form.component.scss']
})
export class ArtworkUpdateComponent implements OnInit {

  uploadedImages: Picture[];

  @Input() artwork: any;

  // private artwork: Artwork;
  constructor(
    private route: ActivatedRoute,
    private artworkService: ArtworkService,
    private location: Location
  ) { 
    this.route.params.subscribe( params => {
      console.log('helloe')
      console.log(params)
    } )
  }

  ngOnInit(): void {
    // const pathEx = location.path

    // console.log(pathEx)
    // const isNew = this.route.url._value[1].path
    // if (isNew == 'add') {
    //   console.log('new')
    //   this.artwork = new Artwork();
    // } else {
      const id = +this.route.snapshot.paramMap.get('id');
      console.log('update');
      this.getArtwork(id);
    // }
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
