import {NgModule, NgZone} from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EvArtgeneveRoutingModule }       from './ev-artgeneve-routing.module';

import { EvArtgeneveComponent }           from './ev-artgeneve.component';
import { ExhibitorsComponent }            from './exhibitors/exhibitors.component';
import { ArtistsComponent }               from './artists/artists.component';
import { ArtworksComponent }              from './artworks/artworks.component';
import { GaleriesComponent }              from './galeries/galeries.component';
import { ExhibitorDetailComponent } from './exhibitors/exhibitor-detail/exhibitor-detail.component';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatPaginator,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    EvArtgeneveRoutingModule,
    FormsModule,
    MatTableModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  declarations: [
    EvArtgeneveComponent,
    ExhibitorsComponent,
    ArtistsComponent,
    ArtworksComponent,
    GaleriesComponent,
    ExhibitorDetailComponent
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ]
})
export class EvArtgeneveModule {}
