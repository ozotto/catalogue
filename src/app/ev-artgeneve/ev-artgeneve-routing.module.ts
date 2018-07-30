import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule, TranslateService, TranslatePipe, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { EvArtgeneveComponent }           	from './ev-artgeneve.component';
import { ExhibitorsComponent }  				from './components/exhibitors/exhibitors.component';
import { ArtistsComponent }  				from './components/artists/artists.component';
import { ArtworksComponent }    			from './components/artworks/artworks.component';
import { GaleriesComponent }    		from './components/galeries/galeries.component';
import { ExhibitorDetailComponent } from './components/exhibitors/exhibitor-detail/exhibitor-detail.component';
import { ArtworkDetailComponent } from './components/artworks/artwork-detail/artwork-detail.component';
/*import {ArtworkCreateComponent} from './components/artworks/artwork-create/artwork-create.component';*/

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
          { path: 'artworks/add', component: ArtworkDetailComponent },
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
