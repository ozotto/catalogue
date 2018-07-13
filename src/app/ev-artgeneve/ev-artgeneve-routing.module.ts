import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule, TranslateService, TranslatePipe, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { EvArtgeneveComponent }           	from './ev-artgeneve.component';
import { ExhibitorsComponent }  				from './exhibitors/exhibitors.component';
import { ArtistsComponent }  				from './artists/artists.component';
import { ArtworksComponent }    			from './artworks/artworks.component';
import { GaleriesComponent }    		from './galeries/galeries.component';
import { ExhibitorDetailComponent } from './exhibitors/exhibitor-detail/exhibitor-detail.component';
import { ArtworkDetailComponent } from './artworks/artwork-detail/artwork-detail.component';

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
          { path: 'art-exhibited', component: ArtistsComponent },
          { path: 'artworks', component: ArtworksComponent },
          { path: 'artworks/:id', component: ArtworkDetailComponent },
          { path: 'galeries', component: GaleriesComponent },
          { path: 'details/:id', component: ExhibitorDetailComponent },
          //{ path: '', component: EvArtgeneveComponent }
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
