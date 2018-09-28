import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import * as _ from 'lodash';

import {BACKEND_URL} from '../../../../sys/constants';
import {PermissionsHelper} from '../../../../sys/helpers/permissions.helper';
import {Animation} from '../../../models/animation';
import {AnimationService} from '../../../services/animation.service';
import {TypeService} from '../../../services/type.service';
import {Type} from '../../../models/type';
import {PublicService} from '../../../services/public.service';
import {LocationService} from '../../../services/location.service';
import {ExhibitorService} from '../../../services/exhibitor.service';
import {AuthorService} from '../../../services/author.service';
import {Author} from '../../../models/author';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {ScheduleService} from '../../../services/schedule.service';
import {Schedule} from '../../../models/shedule';

@Component({
  selector: 'app-animation-detail',
  templateUrl: './animation-detail.component.html',
  styleUrls: ['./animation-detail.component.scss']
})
export class AnimationDetailComponent implements OnInit {

  authorControl = new FormControl();
  filteredAuthors: Observable<Author[]>;

  public animation: Animation;
  public newAnimation; // A definir un modèle
  public BACKEND_URL: String;

  public isSuperUser: Boolean;
  private isNew: Boolean;

  public types;
  public publics;
  public locations;
  public exhibitors;
  public authors;
  public shedules;

  public selectedType;
  public selectedLocation;
  public selectedExhibitor;
  public selectedAuthors;
  public selectedPublic: Array<number>;
  public selectedDateStart;

  public displayedAuthors;
  public displayedSchedules;

  minDate = new Date(2018, 0, 1);
  maxDate = new Date(2020, 0, 1);

  constructor(
    private route: ActivatedRoute,
    private animationService: AnimationService,
    private publicservice: PublicService,
    private typeservice: TypeService,
    private locationservice: LocationService,
    private exhibitorservice: ExhibitorService,
    private scheduleservice: ScheduleService,
    private authorservice: AuthorService,
    private permissionshelper: PermissionsHelper,
    private location: Location
  ) {
    this.route.params.subscribe( params => this.isNew = _.isEmpty(params) );

  }

  ngOnInit() {
    this.BACKEND_URL = BACKEND_URL;
    const isSuperUser = this.permissionshelper.showIfSuperUser();
    this.animation = new Animation();
     if (!this.isNew) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.getAnimation(id);
    }


    this.selectedPublic = new Array<number>();
    this.selectedAuthors = new Array<number>();
    this.selectedDates = new Array<number>();

    this.displayedAuthors = new Array<Author>();
    this.displayedSchedules = new Array<Schedule>();


    this.getTypes();
    this.getPublics();
    this.getLocations();
    this.getExhibitors();
    this.getAuthors();
    this.getSchedules();
  }

  getAnimation(id): void {
    this.animationService.getAnimation(id).subscribe((animation) => {
      this.animation = animation;
      this.selectedType = this.animation.type.id;
      this.selectedLocation = this.animation.location.id;
      this.selectedExhibitor = this.animation.exhibitor.id;

      this.animation.public.forEach((value, index) => {
        this.selectedPublic.push(value.id);
      });

    });


  }

  getTypes() {
    this.typeservice.getTypes().subscribe((types) => {
      this.types = types;
    });
  }

  getPublics() {
    this.publicservice.getPublics().subscribe((publics) => {
      this.publics = publics;
    });
  }

  getLocations() {
    this.locationservice.getLocations().subscribe((locations) => {
      this.locations = locations;
      console.log('locations');
    });
  }

  getExhibitors() {
    this.exhibitorservice.getExhibitors().subscribe((exhibitors) => {
      this.exhibitors = exhibitors;
    });
  }

  getAndDisplayAuthor(id: number) {
    this.authorservice.getAuthor(id).subscribe((author) => {
      this.displayedAuthors.push(author);
    });
  }

  getAuthors() {
    this.authorservice.getAuthors().subscribe((authors) => {
      this.authors = authors;
      this.setFilterAuthor();
    });
  }


  getSchedules() {
    this.scheduleservice.getSchedules().subscribe((shedules) => {
      this.shedules = shedules;

      console.log('this.shedules');
      console.log(this.shedules);
    });
  }

  selectAuthor(event) {
    this.selectedAuthors.push(event.option.value);

    this.getAndDisplayAuthor(event.option.value);

    this.authorControl.setValue('');
    this.setFilterAuthor();
  }
  selectDate(event) {
    this.selectedDateStart = event.value;
  }
  addSchedule(event) {
    // this.scheduleservice.addSchedule();
    this.displayedSchedules.push(this);
  }
  deleteAuthor(author) {
    this.selectedAuthors.splice(this.selectedAuthors.indexOf(author.id), 1 );
    this.displayedAuthors.splice(this.displayedAuthors.indexOf(author), 1 );
  }

  private setFilterAuthor() {
    this.filteredAuthors = this.authorControl.valueChanges
      .pipe(
        startWith(''),
        map(author => author ? this._filterAuthors(author) : this.authors.slice())
      );
  }

  private _filterAuthors(value: string): Author[] {
    const filterValue = value.toLowerCase();

    return this.authors.filter(author => author.last_name.toLowerCase().indexOf(filterValue) === 0);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (!this.isNew) {
      this.newAnimation.is_validated = 2;
      this.newAnimation.animation = this.animation.id;
      this.animationService.updateAnimation(this.newAnimation).subscribe(
        () => this.goBack()
      );
    }
  }

}
