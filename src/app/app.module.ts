///<reference path="sys-services/alert.service.ts"/>
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
import { AuthGuard } from './sys-guards/auth.guard';

import { SysDashboardComponent } from './sys-dashboard/sys-dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './sys-directive/alert.component';

import {AuthenticationService} from './sys-services/authentication.service';
import { UserService } from './sys-services/user.service';
import { AlertService } from './sys-services/alert.service';
import {JwtInterceptor} from './sys-helpers/jwt.interceptor';
import {ErrorInterceptor} from './sys-helpers/error.interceptor';
import { SysNavbarComponent } from './sys-navbar/sys-navbar.component';
import {MatTableModule} from '@angular/material';

//Http Clien and Memory data
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './sys-services/in-memory-data.service';



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
    SysDashboardComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    SysNavbarComponent,
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
    MatTableModule,
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
