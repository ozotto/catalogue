import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';
import {AlertService} from '../../services/alert.service';


@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  eventName: string;
  accCode: string;
  accPwd: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // store event_name to filter menu
    // http://127.0.0.1:4200/login?eventName=livre
    //http://127.0.0.1:4200/login?accCode=jperrenoud&accPwd=palexpo18
    this.eventName = this.route.snapshot.queryParams['eventName'];
    this.accCode = this.route.snapshot.queryParams['accCode'];
    this.accPwd = this.route.snapshot.queryParams['accPwd'];
    
    if(this.accCode != null && this.accPwd != null ){
      
      this.authLogin(this.accCode, this.accPwd);
    }

    //console.log('event_name');
    console.log(this.accCode + '' + this.accPwd);
    localStorage.setItem('event_name', 'livre'); // TODO: Quand on sera en prod mettre -> this.eventName ä la place de livre

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    console.log('gniaa');
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.authLogin(this.f.username.value, this.f.password.value);

/*    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('mannheim');
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          this.loading = false;
        });*/
  }

  authLogin(user, pwd){
    this.loading = true;
    this.authenticationService.login(user, pwd)
      .pipe(first())
      .subscribe(
        data => {
          console.log('mannheim');
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          // this.alertService.error(error);
          this.loading = false;
        }) 
  }
}
