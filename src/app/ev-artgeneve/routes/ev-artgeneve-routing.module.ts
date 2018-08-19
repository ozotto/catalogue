import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule, TranslateService, TranslatePipe, TranslateLoader } from '@ngx-translate/core';

import { EvArtgeneveComponent } from '../ev-artgeneve.component';
import { ExhibitorsComponent } from '../components/exhibitors/exhibitors.component';
import { ExhibitorDetailComponent } from '../components/exhibitors/exhibitor-detail/exhibitor-detail.component';
import { ArtistsComponent } from '../components/artists/artists.component';
import { ArtistDetailComponent } from '../components/artists/artist-detail/artist-detail.component';
import { ArtworksComponent } from '../components/artworks/artworks.component';
import { ArtworkDetailComponent } from '../components/artworks/artwork-detail/artwork-detail.component';
import { GaleriesComponent } from '../components/galeries/galeries.component';
import { GalleryDetailComponent } from '../components/galeries/gallery-detail/gallery-detail.component';


const artgeneveRoutes: Routes = [
  {
    path: '',
    component: EvArtgeneveComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: '',
        //canActivateChild: [AuthGuard],
        children: [
          { path: 'exhibitors', component: ExhibitorsComponent },
          { path: 'exhibitors/:id', component: ExhibitorDetailComponent },
          { path: 'art-represented', component: ArtistsComponent },
          { path: 'art-represented/add', component: ArtistDetailComponent },
          { path: 'art-represented/:id', component: ArtistDetailComponent },
          { path: 'art-exhibited', component: ArtistsComponent },
          { path: 'art-exhibited/add', component: ArtistDetailComponent },
          { path: 'art-exhibited/:id', component: ArtistDetailComponent },
          { path: 'artworks', component: ArtworksComponent },
          { path: 'artworks/add', component: ArtworkDetailComponent },
          { path: 'artworks/:id', component: ArtworkDetailComponent },
          { path: 'galeries', component: GaleriesComponent },
          { path: 'galeries/add', component: GalleryDetailComponent },
          { path: 'galeries/:id', component: GalleryDetailComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(artgeneveRoutes),
    TranslateModule
  ],
  exports: [
    RouterModule,
    TranslatePipe
  ],
  providers: [TranslateModule]
})
export class EvArtgeneveRoutingModule { }
