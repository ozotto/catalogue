import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import * as _ from 'lodash';

import { Exhibitor } from '../../../models/exhibitor';
import { ExhibitorService } from '../../../services/exhibitor.service';
import {PermissionsHelper} from '../../../../sys/helpers/permissions.helper';

@Component({
  selector: 'app-exhibitor-detail',
  templateUrl: './exhibitor-detail.component.html',
  styleUrls: ['./exhibitor-detail.component.scss']
})
export class ExhibitorDetailComponent implements OnInit {

  public exhibitor: Exhibitor;
  public newExhibitor;
  public selectedValue: Array<number>;

  public isSuperUser: Boolean;
  private isNew: Boolean;

  constructor(
    private route: ActivatedRoute,
    private exhibitorService: ExhibitorService,
    private location: Location,
    private permissionhelper: PermissionsHelper
  ) {
    this.route.params.subscribe( params => this.isNew = _.isEmpty(params) );
  }

  ngOnInit() {
    const isSuperUser = this.permissionhelper.showIfSuperUser();
    this.selectedValue = new Array<number>();

    this.exhibitor = new Exhibitor();
     if (!this.isNew) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.getExhibitor(id);
    }
  }

  getExhibitor(id): void {
    this.exhibitorService.getExhibitor(id).subscribe((exhibitor) => {
      this.exhibitor = exhibitor;
      console.log(this.exhibitor);
      this.exhibitor.exhibitor.cat_product_and_services.forEach((value, index) => {
        this.selectedValue.push(value.id);
        console.log('this.selectedValue');

      });
    });
    console.log('kevin: ');
    console.log(this.selectedValue);
  }

   // testEvent() {
   //    console.log('clic');
   //    console.log(this.exhibitor.exhibitor.cat_product_and_services);
   //    console.log(this.selectedValue);
   // }



  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (!this.isNew) {
      // console.log('this.exhibitor');
      // console.log(this.exhibitor);

      this.newExhibitor.state = this.exhibitor.exhibitor.state.id
      this.newExhibitor.exhibitor = this.exhibitor.exhibitor.id;
      // console.log('hello')
      // console.log(this.newExhibitor)

      this.exhibitorService.updateExhibitor(this.newExhibitor).subscribe(
        () => this.goBack()
      );
    }
  }

}
