import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ArtworkService } from '../../services/artwork.service';
import * as moment from 'moment';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

import { Artwork } from '../artwork';
import {Artist} from '../../artists/artist';



@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.scss']
})
export class ArtworkDetailComponent implements OnInit {
  @Input() artwork: Artwork;

  constructor(
    private route: ActivatedRoute,
    private artworkService: ArtworkService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getArtwork();
  }

  getArtwork(): void {
    console.log('here')
    const id = +this.route.snapshot.paramMap.get('id');
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
