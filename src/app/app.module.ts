
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { FullLayoutComponent } from "./sys/components/layouts/full/full-layout.component"

import { AuthGuard } from './sys/services/auth/auth-guard.service';
import { AuthenticationService } from './sys/services/auth/authentication.service';
import { AlertService } from './sys/services/alert.service';
import { UserService } from './sys/services/user.service';

import { SharedModule } from "./sys/components/shared/shared.module";
import { HomeComponent } from './sys/components/home/home.component';
import { LoginComponent } from './sys/components/login/login.component';
import { AlertComponent } from './sys/directives/alert/alert.component';

import * as $ from 'jquery';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
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
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }