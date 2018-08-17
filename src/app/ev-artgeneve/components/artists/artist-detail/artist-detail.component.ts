import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {

	private path: any[];
  private isExhibited: Boolean;

  constructor(private router : Router) {
  	this.path = this.router.url.split("/");
    this.isExhibited = (this.path[2] == 'art-exhibited') ? true : false;
  }

  ngOnInit() {
  }

}
