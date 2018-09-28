import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import * as _ from 'lodash';

import { Autograph } from '../../../models/autograph';
import { AutographService } from '../../../services/autograph.service';
import {BACKEND_URL} from '../../../../sys/constants';
import {PermissionsHelper} from '../../../../sys/helpers/permissions.helper';
import {AuthorService} from '../../../services/author.service';
import {startWith} from 'rxjs-compat/operator/startWith';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
import {map} from 'rxjs/operators';
import {Author} from '../../../models/author';

@Component({
  selector: 'app-autograph-detail',
  templateUrl: './autograph-detail.component.html',
  styleUrls: ['./autograph-detail.component.scss']
})
export class AutographDetailComponent implements OnInit {

  public autograph: Autograph;
  public newAutograph; // A definir un modèle
  public BACKEND_URL: String;

  public isSuperUser: Boolean;
  private isNew: Boolean;

  defaultAuthors: Array<Author>;

  public authors;
  public selectedAuthor;

  authorControl = new FormControl();
  filteredAuthors: any;

  constructor(
    private route: ActivatedRoute,
    private autographService: AutographService,
    private location: Location,
    private permissionshelper: PermissionsHelper,
    private authorservice: AuthorService
  ) {
    this.route.params.subscribe( params => this.isNew = _.isEmpty(params) );
  }

  ngOnInit() {
    this.BACKEND_URL = BACKEND_URL;
    const isSuperUser = this.permissionshelper.showIfSuperUser();
    this.autograph = new Autograph();
     if (!this.isNew) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.getAutograph(id);
      this.getAuthors();
    }
  }

  getAutograph(id): void {
    this.autographService.getAutograph(id).subscribe((autograph) => {
      this.autograph = autograph;
      console.log(this.autograph);
    });
    // this.selectedAuthor = this.autograph.author.id;
  }

  getAuthors() {
    this.authorservice.getAuthors().subscribe((authors) => {
      this.authors = authors;




      console.log('authors');
      console.log(authors);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.authors.filter(option => option.toLowerCase().includes(filterValue));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (!this.isNew) {
      this.newAutograph.is_validated = 2;
      this.newAutograph.autograph = this.autograph.id;
      this.autographService.updateAutograph(this.newAutograph).subscribe(
        () => this.goBack()
      );
    }
  }

}
