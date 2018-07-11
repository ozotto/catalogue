import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EvArtmontecarloRoutingModule }       from './ev-artmontecarlo-routing.module';

import { EvArtmontecarloComponent }           from './ev-artmontecarlo.component';
import { ExhibitorsComponent }            from './exhibitors/exhibitors.component';
import { ArtistsComponent }               from './artists/artists.component';
import { ArtworksComponent }              from './artworks/artworks.component';
import { GaleriesComponent }              from './galeries/galeries.component';
import { ExhibitorDetailComponent } from './exhibitors/exhibitor-detail/exhibitor-detail.component';

@NgModule({
  imports: [
    CommonModule,
    EvArtmontecarloRoutingModule,
    FormsModule
  ],
  declarations: [
    EvArtmontecarloComponent,
    ExhibitorsComponent,
    ArtistsComponent,
    ArtworksComponent,
    GaleriesComponent,
    ExhibitorDetailComponent
  ]
})
export class EvArtmontecarloModule {}
