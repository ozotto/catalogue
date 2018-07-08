import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { EvArtgeneveComponent }             from './ev-artgeneve.component';
import { ExhibitorsComponent }          from './exhibitors/exhibitors.component';
import { ArtistsComponent }          from './artists/artists.component';
import { ArtworksComponent }          from './artworks/artworks.component';
import { GaleriesComponent }        from './galeries/galeries.component';

import { EvArtgeneveRoutingModule }       from './ev-artgeneve-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EvArtgeneveRoutingModule
  ],
  declarations: [
    EvArtgeneveComponent,
    ExhibitorsComponent,
    ArtistsComponent,
    ArtworksComponent,
    GaleriesComponent
  ]
})
export class EvArtgeneveModule {}