///<reference path="sys/services/alert.service.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Router } from '@angular/router';

import { AppComponent } from './app.component';

// import ngx-translate and the http loader
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { AuthGuard } from './sys/guards/auth.guard';

import { HomeComponent } from './sys/components/home/home.component';
import { LoginComponent } from './sys/components/login/login.component';
import { AlertComponent } from './sys/directives/alert/alert.component';

import {AuthenticationService} from './sys/services/authentication.service';
import { UserService } from './sys/services/user.service';
import { AlertService } from './sys/services/alert.service';
import {JwtInterceptor} from './sys/helpers/jwt.interceptor';
import {ErrorInterceptor} from './sys/helpers/error.interceptor';
import {MatSnackBar, MatSnackBarModule, MatTableModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServicesHelper} from './sys/helpers/services.helper';
import {FileUploadModule} from 'ng2-file-upload';
import {DashboardComponent} from './sys/components/dashboard/dashboard.component';
import {NavbarComponent} from './sys/components/navbar/navbar.component';

//Http Clien and Memory data
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './services/in-memory-data.service';



/*import { EvArtgeneveComponent } from './ev-artgeneve/ev-artgeneve.component';*/

/*import { ExhibitorsComponent } from './ev-artgeneve/exhibitors/exhibitors.component';
import { GaleriesComponent } from './ev-artgeneve/galeries/galeries.component';
import { ArtworksComponent } from './ev-artgeneve/artworks/artworks.component';
import { ArtistsComponent } from './ev-artgeneve/artists/artists.component';*/

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    /*EvArtgeneveComponent,
    ExhibitorsComponent,
    GaleriesComponent,
    ArtworksComponent,
    ArtistsComponent*/
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FileUploadModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, {  passThruUnknownUrl: true, dataEncapsulation: false }
    //   //InMemoryDataService, { dataEncapsulation: false }
    // ),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [
    ServicesHelper,
    AuthGuard,
    AlertService,
    UserService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
