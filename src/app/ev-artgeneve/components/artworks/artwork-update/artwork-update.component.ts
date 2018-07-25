import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ArtworkService } from '../../../services/artwork.service';
import * as moment from 'moment';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

import { Artwork } from '../../../models/artwork';
import {Artist} from '../../../models/artist';



@Component({
  selector: 'app-artwork-update',
  templateUrl: '../shared/artwork-form.component.html',
  styleUrls: ['../shared/artwork-form.component.scss']
})
export class ArtworkUpdateComponent implements OnInit {
  @Input() artwork: any;
  // private artwork: Artwork;
  constructor(
    private route: ActivatedRoute,
    private artworkService: ArtworkService,
    private location: Location
  ) { }

  ngOnInit(): void {

    const isNew = this.route.url.value[1].path
    if (isNew == 'add') {
      console.log('new')
      this.artwork = new Artwork();
    } else {
      const id = +this.route.snapshot.paramMap.get('id');
      console.log('update');
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




//   testdate($event): void {
//     console.log('test');
//     this.artwork.year = $event.value;
//
// //    this.artwork.year = moment($event.value).format('YYYY-MM-DD');
//   }



}
