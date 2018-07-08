import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// import ngx-translate and the http loader
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { SysDashboardComponent } from './sys-dashboard/sys-dashboard.component';
import { EvArtgeneveComponent } from './ev-artgeneve/ev-artgeneve.component';
import { ExhibitorsComponent } from './ev-artgeneve/exhibitors/exhibitors.component';
import { GaleriesComponent } from './ev-artgeneve/galeries/galeries.component';
import { ArtworksComponent } from './ev-artgeneve/artworks/artworks.component';
import { ArtistsComponent } from './ev-artgeneve/artists/artists.component';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SysDashboardComponent,
    EvArtgeneveComponent,
    ExhibitorsComponent,
    GaleriesComponent,
    ArtworksComponent,
    ArtistsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
