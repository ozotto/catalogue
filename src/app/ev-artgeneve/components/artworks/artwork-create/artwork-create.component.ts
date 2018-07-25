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
  selector: 'app-artwork-create',
  templateUrl: '../shared/artwork-form.component.html',
  styleUrls: ['../shared/artwork-form.component.scss']
})
export class ArtworkCreateComponent implements OnInit {
  private artwork: Artwork;

  constructor(
    private route: ActivatedRoute,
    private artworkService: ArtworkService,
    private location: Location
  ) { }

  ngOnInit(): void {
    // this.getArtwork();
    this.artwork = new Artwork();
  }

  // getArtwork(): void {
  //   console.log('here')
  //   const id = +this.route.snap  shot.paramMap.get('id');
  //   this.artworkService.getArtwork(id)
  //     .subscribe(artwork => {
  //       this.artwork = artwork;
  //     });
  // }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.artworkService.addArtwork(this.artwork)
      .subscribe(res => {

        console.log('mamamamama');
        console.log(res);
        this.goBack();

      });
  }
}
