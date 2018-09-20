import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import * as _ from 'lodash';

import { Author } from '../../../models/author';
import { AuthorService } from '../../../services/author.service';
import {BACKEND_URL} from '../../../../sys/constants';
import {PermissionsHelper} from '../../../../sys/helpers/permissions.helper';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit {

  public author: Author;
  public newAuthor; //ä definir un modèle
  public BACKEND_URL: String;

  public isSuperUser: Boolean;
  private isNew: Boolean;


  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private location: Location,
    private permissionshelper: PermissionsHelper
  ) {
    this.route.params.subscribe( params => this.isNew = _.isEmpty(params) );
  }

  ngOnInit() {
    this.BACKEND_URL = BACKEND_URL;
    const isSuperUser = this.permissionshelper.showIfSuperUser();
    this.author = new Author();
     if (!this.isNew) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.getAuthor(id);
    }
  }

  getAuthor(id): void {
    this.authorService.getAuthor(id).subscribe((author) => {
      this.author = author;
      console.log(this.author);
    });
  }

  // testEvent() {
  //   // console.log('clic');
  //   // console.log(this.selectedValue);
  // }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (!this.isNew) {
      this.newAuthor.is_validated = 2;
      this.newAuthor.author = this.author.id;
      this.authorService.updateAuthor(this.newAuthor).subscribe(
        () => this.goBack()
      );
    }
  }

}
