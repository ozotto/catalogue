import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import * as _ from 'lodash';

import {BACKEND_URL} from '../../../../sys/constants';
import {PermissionsHelper} from '../../../../sys/helpers/permissions.helper';
import {Animation, NewAnimation} from '../../../models/animation';
import {AnimationService} from '../../../services/animation.service';
import {TypeService} from '../../../services/type.service';
import {Type} from '../../../models/type';
import {PublicService} from '../../../services/public.service';
import {LocationService} from '../../../services/location.service';
import {ExhibitorService} from '../../../services/exhibitor.service';
import {AuthorService} from '../../../services/author.service';
import {Author} from '../../../models/author';
import {map, startWith} from 'rxjs/operators';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {ScheduleService} from '../../../services/schedule.service';
import {Schedule} from '../../../models/shedule';
import {Public} from '../../../models/public';
import {UsersHelper} from '../../../../sys/helpers/users.helper';
import * as moment from 'moment';
import {UtilsHelper} from '../../../../sys/helpers/utils.helper';
import {DisplayedDate, AddedDate} from '../../../../sys/models/date';

import { AmazingTimePickerService } from 'amazing-time-picker';

@Component({
  selector: 'app-animation-detail',
  templateUrl: './animation-detail.component.html',
  styleUrls: ['./animation-detail.component.scss']
})
export class AnimationDetailComponent implements OnInit {

  authorControl = new FormControl();
  filteredAuthors: Observable<Author[]>;

  //title = new FormControl('', [Validators.required]);

  animationForm;

  public animation: Animation;
  public newAnimation: NewAnimation ; // A definir un modèle
  public BACKEND_URL: String;

  public isSuperUser: Boolean;
  private isNew: Boolean;

  public isNewAuthorBlockVisible;
  public isNewAuthor;

  public showSpeakers;
  public showDescAnimation;

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
  public newAuthor;

  public selectedDate;
  //public selectedHourStart : String;
  public selectedHourStart;
  public selectedHourEnd;



  public displayedAuthors;
  public displayedSchedules;

  //minDate = new Date(2018, 0, 1);
  // maxDate = new Date(2020, 0, 1);
  public minDate = new Date(2019, 4, 1);
  public maxDate = new Date(2019, 4, 5);
  public startDate = new Date(2019, 4, 1);
  public startHour = "09:00"
  public endHour = "10:00";
  public maxTimeAnimation = 7200000; //value in ms

  public showErrorTime : Boolean;
  public errorTime : String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animationservice: AnimationService,
    private publicservice: PublicService,
    private typeservice: TypeService,
    private locationservice: LocationService,
    private exhibitorservice: ExhibitorService,
    private scheduleservice: ScheduleService,
    private authorservice: AuthorService,
    private permissionshelper: PermissionsHelper,
    private usershelper: UsersHelper,
    private utilshelper: UtilsHelper,
    private location: Location,
    private atp: AmazingTimePickerService
  ) {
    this.route.params.subscribe( params => this.isNew = _.isEmpty(params) );

  }

  ngOnInit() {
   
    const animation_id = +this.route.snapshot.paramMap.get('id');
    this.BACKEND_URL = BACKEND_URL;
    const isSuperUser = this.permissionshelper.showIfSuperUser();
    this.animation = new Animation();
    this.animationForm = new FormGroup({
      'title' : new FormControl(this.animation.title, [Validators.required])
      
    });

    if (!this.isNew) {
      this.getAnimation(animation_id);
    }

    this.isNewAuthorBlockVisible = false;
    this.showSpeakers = false;
    this.showDescAnimation = false;

    this.selectedPublic = new Array<number>();
    this.selectedAuthors = new Array<number>();
    //this.selectedDate = new Array<number>();
    this.selectedDate = this.startDate;
    

    this.selectedHourStart = this.startHour;
    this.selectedHourEnd = this.endHour;
       

    this.newSchedules = new Array<string>();
    this.newAuthor = new Author();

    this.displayedAuthors = new Array<Author>();
    this.displayedSchedules = new Array<Schedule>();


    this.getTypes();
    this.getPublics();
    this.getLocations();
    this.getExhibitors();
    this.getAuthors();
    this.getSchedules(animation_id);
  }

  get title() { return this.animationForm.get('title'); }

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
      // animation_id

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

      console.log('displayed author in getAndDisplayAuthor');
      console.log(this.displayedAuthors);
    });
  }

  updateDiplayAuthor(indexToUpdate) {
    // this.displayedAuthors.splice(this.displayedAuthors.indexOf(indexToUpdate), 1);

    console.log('indexToUpdate before getAndDisplayAuthor');
    console.log(this.displayedAuthors);
    this.getAndDisplayAuthor(indexToUpdate);


    console.log('indexToUpdate before remove_element_in_list');
    console.log(this.displayedAuthors);
    this.utilshelper.remove_object_in_list(indexToUpdate, this.displayedAuthors);


    console.log('indexToUpdate after remove_element_in_list');
    console.log(this.displayedAuthors);

  }

  getAuthors() {
    this.authorservice.getAuthors().subscribe((authors) => {
      this.authors = authors;
      this.setFilterAuthor();
    });
  }

  getSchedules(animation_id) {

    // this.scheduleservice.getSchedules(1).subscribe((animation) => {
    //   // animation_id
    // })
    //
    this.scheduleservice.getSchedules(animation_id).subscribe((shedules) => {
      shedules.forEach((value, index) => {
        const current = new DisplayedDate();
        current.id = value.id;
        current.date = value.date_start;

        current.hour_start = moment(value.date_start).format('HH:mm');
        current.hour_end = moment(value.date_end).format('HH:mm');
        this.displayedSchedules.push(current);
      });
    });
  }

  setAuthor(event) {

    // IF an author is selected ELSE create a new author
    if (event.option.value) {
      console.log(this.selectedAuthors.some(e => e === event.option.value))
      // check if element exist in array
      if (this.selectedAuthors.some(e => e === event.option.value)) {
        alert('vous avez déjà ajouté cet auteur')
        this.authorControl.setValue('');
      } else {
        this.selectedAuthors.push(event.option.value);
        this.getAndDisplayAuthor(event.option.value);
        this.authorControl.setValue('');
        this.setFilterAuthor();
      }
    } else {
      // this.display_new_author_block();
      // this.newAuthor = new Author();
      this.isNewAuthorBlockVisible = true;
      this.isNewAuthor = true;
      // this.authorservice.addAuthor(this.newAuthor).subscribe((author) => {
      //   this.newAuthor.id = author.id;
      // });
    }
  }

  addAuthor() {
    if (this.isNewAuthor) {
      console.log('GNIAAA getAndDisplayAuthor');
      this.authorservice.addAuthor(this.newAuthor).subscribe((author) => {

        // setTimeout(function() {
        //   document.getElementById('input-authors').focus();
        // }, 0);

        this.selectedAuthors.push(author.id);
        this.isNewAuthorBlockVisible = false;

        // if (this.isNewAuthor) {

        console.log('getAndDisplayAuthor');
        this.getAndDisplayAuthor(author.id);
        // }

        // console.log('addAuthor SANS image');
        // console.log(author);
      });
    } else {

      console.log('GNIAAA updateDiplayAuthor');
      this.authorservice.updateAuthor(this.newAuthor).subscribe((author) => {
        // this.displayedAuthors.push(author);

        // setTimeout(function() {
        //   document.getElementById('input-authors').focus();
        // }, 0);


        // this.selectedAuthors.push(author.id);

        this.isNewAuthorBlockVisible = false;

        // IF author
        // if (this.isNewAuthor) {
        //   this.getAndDisplayAuthor(author.id);
        // } else {

        console.log('updateDiplayAuthor');

        console.log('add author before updateDisplayAuthor');
        console.log(this.displayedAuthors);

        this.updateDiplayAuthor(author);


        console.log('add author after updateDisplayAuthor');
        console.log(this.displayedAuthors);
        // }

      });
    }

  }


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

      document.getElementById('input-calendar').focus();
    } else {
      console.log('MANGNIA');
    }

  }

  hide_new_author_block() {
    this.isNewAuthorBlockVisible = false;
    // The timeout is needed to make sure that the autocomplete component is rendered at the time of calling focus.
    // Source: https://stackoverflow.com/questions/37826507/how-set-focus-in-angular-md-autocomplete
    setTimeout(function() {
      document.getElementById('input-authors').focus();
    }, 0);
  }

  deleteAuthor(author) {

    this.utilshelper.remove_id_in_list(author.id, this.selectedAuthors)
    this.utilshelper.remove_object_in_list(author, this.displayedAuthors)


    // this.selectedAuthors.splice(this.selectedAuthors.indexOf(author.id), 1 );
    // this.displayedAuthors.splice(this.displayedAuthors.indexOf(author), 1 );
  }

  alterAuthor(author) {

    console.log('displayed author in alterAuthor');
    console.log(this.displayedAuthors);

    console.log('alter author');
    console.log(author);

    this.isNewAuthorBlockVisible = true;

    this.newAuthor = author;
    // remove image & thumbnail -> sended via ng2-file-upload component
    delete this.newAuthor.image;

    this.isNewAuthor = false;
  }

  deleteSchedule(schedule) {
    this.utilshelper.remove_id_in_list(schedule.id, this.newSchedules)
    this.utilshelper.remove_object_in_list(schedule, this.displayedSchedules)

    // this.newSchedules.splice(this.newSchedules.indexOf(schedule.id), 1 );
    // this.displayedSchedules.splice(this.displayedSchedules.indexOf(schedule), 1 );

    // console.log('before deleteSchedule id');
    // console.log(schedule.id);
    //
    // console.log('before deleteSchedule value');
    // console.log(schedule);

    this.scheduleservice.deleteSchedule(schedule).subscribe(
      // () => this.goBack()
      // animation => { animation_id = animation.id; console.log('animation_id'); console.log(animation_id); }
      response => console.log('after deleteSchedule'),
    );
  }

  // public display_new_author_block() {
  //   this.isNewAuthorBlockVisible = true;
  // }

  private setFilterAuthor() {
    this.filteredAuthors = this.authorControl.valueChanges
      .pipe(
        startWith(''),
        map(author => author ? this._filterAuthors(author) : this.authors.slice())
      );
  }

  private _filterAuthors(value: string): Author[] {
    console.log("value _filterAuthors");
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.authors.filter(function (author) {
      if (author.last_name) { return author.last_name.toLowerCase().indexOf(filterValue) === 0}
    });
  }

  getAuthorIdFromFileUpload(author_id) {
    console.log('getAuthorIdFromFileUpload a ete appele');
    console.log(author_id);
    this.newAuthor.id = author_id;
  }

  goBack(): void {
    this.location.back();
  }


  save_and_add_new(): void {
    this.save();
    // this.location.go('/livre/animations/add');
    this.router.navigate(['/livre/animations/add']);
  }

  save(): void {
    let animation_id;

    if (!this.isNew) {
      this.newAnimation = new NewAnimation();
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
        value.animation = this.newAnimation.id;

        console.log('test value schedule')
        console.log(value)

        this.scheduleservice.addSchedule(value).subscribe(
          // () => this.goBack()
        );
      });
    } else {
      this.newAnimation = new NewAnimation();
      // this.newAnimation.id = this.animation.id;
      this.newAnimation.title = this.animation.title;
      this.newAnimation.description = this.animation.description;
      this.newAnimation.type = this.selectedType;
      this.newAnimation.location = this.selectedLocation;
      this.newAnimation.exhibitor = this.selectedExhibitor;
      this.newAnimation.public = this.selectedPublic;
      this.newAnimation.author = this.selectedAuthors;


      this.animationservice.addAnimation(this.newAnimation).subscribe(
        // () => this.goBack()
        animation => {
          console.log('add new animation')
          console.log(animation)
        }
      );

      // this.newSchedules.forEach((value, index) => {
      //   value.animation = this.newAnimation.id;
      //
      //   this.scheduleservice.addSchedule(value).subscribe(
      //     // () => this.goBack()
      //   );
      // });
    }
  }


  getErrorMessage() {
    return this.title.hasError('required') ? 'You must enter a value' :
        this.title.hasError('email') ? 'Not a valid email' :
            '';
  }

  validateType(){
    //Modifier avec les changements de KE
    //Ajouter le code depuis backend
    console.log('commons')
    //Show Speakers
    if(this.selectedType == 13 || this.selectedType == 6 || this.selectedType == 5){
      this.showSpeakers = true;
      this.showDescAnimation = true;
    }else{
      this.showSpeakers = false;
      this.showDescAnimation = false;
    }
    
  }

  openTime(type : string) {
    
    if(type == 'start'){
      const startTimePicker = this.atp.open({ time: this.selectedHourStart });
      startTimePicker.afterClose().subscribe(time => {
        this.selectedHourStart = time;
        this.validateTime();
      });
    }else if(type == 'end'){
      const endTimePicker = this.atp.open({ time: this.selectedHourEnd });
      endTimePicker.afterClose().subscribe(time => {
        this.selectedHourEnd = time;
        this.validateTime();
      });
    }
    
  }

  validateTime(){
    
    var startDate, endDate, diff;

    startDate = moment(this.selectedDate);
    startDate = startDate.hour(this.selectedHourStart.substr(0,2))
    startDate = startDate.minute(this.selectedHourStart.substr(3,4))

    endDate = moment(this.selectedDate);
    endDate = endDate.hour(this.selectedHourEnd.substr(0,2))
    endDate = endDate.minute(this.selectedHourEnd.substr(3,4))  
   
    diff = endDate.diff(startDate);
    
    if(startDate > endDate){
      this.showErrorTime = true;
      this.errorTime = "L'heure finale doit être supérieure à l'heure initiale"
    }else if(diff > this.maxTimeAnimation){
      this.showErrorTime = true;
      this.errorTime = "Les temps maximum autorisö est de 2 heures"
    }else{
      this.showErrorTime = false; 
    }

  }

}
