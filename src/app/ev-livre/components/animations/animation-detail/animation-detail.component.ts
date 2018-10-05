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
import {Public} from '../../../models/public';
import {UsersHelper} from '../../../../sys/helpers/users.helper';
import * as moment from 'moment';


export class DisplayedDate {
  id: number;
  date: string;
  hour_start: string;
  hour_end: string;
}


export class AddedDate {
  animation: number;
  date_start: string;
  date_end: string;
}

@Component({
  selector: 'app-animation-detail',
  templateUrl: './animation-detail.component.html',
  styleUrls: ['./animation-detail.component.scss']
})
export class AnimationDetailComponent implements OnInit {

  authorControl = new FormControl();
  filteredAuthors: Observable<Author[]>;

  public animation: Animation;
  public newAnimation: Animation; // A definir un modèle
  public BACKEND_URL: String;

  public isSuperUser: Boolean;
  private isNew: Boolean;

  public is_new_author_block_visible;

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
  // public selectedDates;
  public newSchedules;

  public selectedDate;
  public selectedHourStart;
  public selectedHourEnd;



public displayedAuthors;
  public displayedSchedules;

  minDate = new Date(2018, 0, 1);
  maxDate = new Date(2020, 0, 1);

  constructor(
    private route: ActivatedRoute,
    private animationservice: AnimationService,
    private publicservice: PublicService,
    private typeservice: TypeService,
    private locationservice: LocationService,
    private exhibitorservice: ExhibitorService,
    private scheduleservice: ScheduleService,
    private authorservice: AuthorService,
    private permissionshelper: PermissionsHelper,
    private usershelper: UsersHelper,
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

    this.is_new_author_block_visible = false;

    this.selectedPublic = new Array<number>();
    this.selectedAuthors = new Array<number>();
    this.selectedDate = new Array<number>();

    this.newSchedules = new Array<string>();

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
    this.animationservice.getAnimation(id).subscribe((animation) => {
      this.animation = animation;
      this.selectedType = this.animation.type.id;
      this.selectedLocation = this.animation.location.id;
      this.selectedExhibitor = this.animation.exhibitor.id;


      this.animation.public.forEach((value, index) => {
        this.selectedPublic.push(value.id);
      });

      this.animation.author.forEach((value, index) => {
        this.selectedAuthors.push(value.id);
        this.getAndDisplayAuthor(value.id)
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
      shedules.forEach((value, index) => {
        const current = new DisplayedDate();
        current.id = value.id;
        current.date = value.date_start;

        const test = moment('12-25-1995', 'HH:mm').toString();

        const test2 = moment(value.date_start).format('HH:mm');

        const test3 = moment(value.date_end).format('HH:mm');

        current.hour_start = moment(value.date_start).format('HH:mm');
        current.hour_end = moment(value.date_end).format('HH:mm');
        this.displayedSchedules.push(current);
      });
    });
  }

  selectAuthor(event) {
    this.selectedAuthors.push(event.option.value);

    this.getAndDisplayAuthor(event.option.value);

    this.authorControl.setValue('');
    this.setFilterAuthor();
  }
  // selectDate(event) {
  //   this.selectedDate = event.value;
  // }
  addSchedule() {

    if (this.selectedDate && this.selectedHourStart) {
      const current = new DisplayedDate();
      current.date = this.selectedDate;
      current.hour_start = this.selectedHourStart;
      current.hour_end = this.selectedHourEnd;

      console.log('current');
      console.log(this.selectedDate);
      console.log('selectedHourStart');
      console.log(this.selectedHourStart);

      this.displayedSchedules.push(current);
      // TODO: formater date pour poster au backend

      const added = new AddedDate();
      added.date_start = moment(new Date(this.selectedDate)).add(this.selectedHourStart.split(':')[0], 'hour').add(this.selectedHourStart.split(':')[1], 'minute').format('YYYY-MM-DDTHH:mm:ss');
      added.date_end = moment(new Date(this.selectedDate)).add(this.selectedHourEnd.split(':')[0], 'hour').add(this.selectedHourEnd.split(':')[1], 'minute').format('YYYY-MM-DDTHH:mm:ss');
      added.animation = this.animation.id;


      console.log('hour')
      console.log(this.selectedHourStart.split(':')[0])

      console.log('minute')
      console.log(this.selectedHourStart.split(':')[1])

      console.log('added');
      console.log(added);

      this.newSchedules.push(added);

      this.selectedDate = null;
      this.selectedHourStart = null;
      this.selectedHourEnd = null;

      document.getElementById("input-calendar").focus();
    } else {
      console.log('MANGNIA');
    }

  }
  deleteAuthor(author) {
    this.selectedAuthors.splice(this.selectedAuthors.indexOf(author.id), 1 );
    this.displayedAuthors.splice(this.displayedAuthors.indexOf(author), 1 );
  }

  deleteSchedule(schedule) {
    this.newSchedules.splice(this.newSchedules.indexOf(schedule.id), 1 );
    this.displayedSchedules.splice(this.displayedSchedules.indexOf(schedule), 1 );

    console.log('before deleteSchedule id');
    console.log(schedule.id);

    console.log('before deleteSchedule value');
    console.log(schedule);

    this.scheduleservice.deleteSchedule(schedule).subscribe(
      // () => this.goBack()
      // animation => { animation_id = animation.id; console.log('animation_id'); console.log(animation_id); }
      response => console.log('after deleteSchedule'),
    );
  }

  public display_new_author_block(event) {
    this.is_new_author_block_visible = true;
    console.log('event');
    console.log(event);
    event.preventDefault();
    console.log(this.is_new_author_block_visible);
  }

  private setFilterAuthor() {
    this.filteredAuthors = this.authorControl.valueChanges
      .pipe(
        startWith(''),
        map(author => author ? this._filterAuthors(author) : this.authors.slice())
      );
  }

  private _filterAuthors(value: string): Author[] {
    const filterValue = value;

    return this.authors.filter(author => author.last_name.toLowerCase().indexOf(filterValue) === 0);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    let animation_id;

    if (!this.isNew) {
      this.newAnimation = new Animation();
      this.newAnimation.id = this.animation.id;
      this.newAnimation.title = this.animation.title;
      this.newAnimation.description = this.animation.description;
      this.newAnimation.type = this.selectedType;
      this.newAnimation.location = this.selectedLocation;
      this.newAnimation.exhibitor = this.animation.exhibitor.id;
      this.newAnimation.public = this.selectedPublic;
      this.newAnimation.author = this.selectedAuthors;

      this.animationservice.updateAnimation(this.newAnimation).subscribe(
        // () => this.goBack()
        animation => { animation_id = animation.id; console.log('animation_id'); console.log(animation_id); }
      );

      this.newSchedules.forEach((value, index) => {
        value.animation = animation_id;

        this.scheduleservice.addSchedule(value).subscribe(
          // () => this.goBack()
        );
      });
    }
  }

}
