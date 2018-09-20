
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { FullLayoutComponent } from './sys/components/layouts/full/full-layout.component';


import { AlertService } from './sys/services/alert.service';
import { UserService } from './sys/services/user.service';

import { HomeComponent } from './sys/components/home/home.component';

import { SharedModule } from './sys/components/shared/shared.module';
import {LoginComponent} from './sys/components/login/login.component';
import {AuthenticationService} from './sys/services/authentication.service';
import {AuthGuard} from './sys/guards/auth.guard';
import {JwtInterceptor} from './sys/helpers/jwt.interceptor';
import {ErrorInterceptor} from './sys/helpers/error.interceptor';
import {AlertComponent} from './sys/directives/alert/alert.component';
import {BrowserModule} from '@angular/platform-browser';
import {PermissionService} from './sys/services/permission.service';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    AlertComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    NgbModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    UserService,
    AlertService,
    PermissionService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
