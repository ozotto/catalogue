import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule, TranslateService, TranslatePipe, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { EvArtmontecarloComponent }           	from './ev-artmontecarlo.component';
import { ExhibitorsComponent }  				from './exhibitors/exhibitors.component';
import { ArtistsComponent }  				from './artists/artists.component';
import { ArtworksComponent }    			from './artworks/artworks.component';
import { GaleriesComponent }    		from './galeries/galeries.component';
import { ExhibitorDetailComponent } from './exhibitors/exhibitor-detail/exhibitor-detail.component';

const artmontecarloRoutes: Routes = [
  {
    path: '',
    component: EvArtmontecarloComponent,
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
          { path: 'galeries', component: GaleriesComponent },
          { path: 'details/:id', component: ExhibitorDetailComponent },
          //{ path: '', component: EvArtmontecarloComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(artmontecarloRoutes),
    TranslateModule
  ],
  exports: [
    RouterModule,
    TranslatePipe
  ],
  providers: [TranslateModule]
})
export class EvArtmontecarloRoutingModule { }
