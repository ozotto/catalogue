import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EvArtgeneveRoutingModule }       from './ev-artgeneve-routing.module';

import { EvArtgeneveComponent }           from './ev-artgeneve.component';
import { ExhibitorsComponent }            from './exhibitors/exhibitors.component';
import { ArtistsComponent }               from './artists/artists.component';
import { ArtworksComponent }              from './artworks/artworks.component';
import { GaleriesComponent }              from './galeries/galeries.component';
import { ExhibitorDetailComponent } from './exhibitors/exhibitor-detail/exhibitor-detail.component';
import {MatTableModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    EvArtgeneveRoutingModule,
    FormsModule,
    MatTableModule,
  ],
  declarations: [
    EvArtgeneveComponent,
    ExhibitorsComponent,
    ArtistsComponent,
    ArtworksComponent,
    GaleriesComponent,
    ExhibitorDetailComponent
  ]
})
export class EvArtgeneveModule {}
