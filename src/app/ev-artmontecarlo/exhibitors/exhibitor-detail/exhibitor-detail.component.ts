import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Exhibitor } from '../exhibitor';
import { ExhibitorService } from '../../services/exhibitor.service';

@Component({
  selector: 'app-exhibitor-detail',
  templateUrl: './exhibitor-detail.component.html',
  styleUrls: ['./exhibitor-detail.component.scss']
})
export class ExhibitorDetailComponent implements OnInit {

	@Input() exhibitor: Exhibitor;

  constructor(
  	private route: ActivatedRoute,
    private exhibitorService: ExhibitorService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getExhibitor();
  }

  getExhibitor(): void {
    console.log('here')
    const id = +this.route.snapshot.paramMap.get('id');
    this.exhibitorService.getExhibitor(id)
      .subscribe(exhibitor => this.exhibitor = exhibitor);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.exhibitorService.updateExhibitor(this.exhibitor)
      .subscribe(() => this.goBack());
  }

}
