import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Artwork } from '../artwork';
import { ArtworkService } from '../../services/artwork.service';

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
      .subscribe(artwork => this.artwork = artwork);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.artworkService.updateArtwork(this.artwork)
      .subscribe(() => this.goBack());
  }

}
