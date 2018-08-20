import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule, TranslateService, TranslatePipe, TranslateLoader } from '@ngx-translate/core';

import { EvSdlComponent } from '../ev-sdl.component';
import { ExhibitorsComponent } from '../components/exhibitors/exhibitors.component';
import { ExhibitorDetailComponent } from '../components/exhibitors/exhibitor-detail/exhibitor-detail.component';
import { AuthorsComponent } from '../components/authors/authors.component';
import { AuthorDetailComponent } from '../components/authors/author-detail/author-detail.component';
import { AnimationsComponent } from '../components/animations/animations.component';
import { AnimationDetailComponent } from '../components/animations/animation-detail/animation-detail.component';


const sdlRoutes: Routes = [
  {
    path: '',
    component: EvSdlComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: '',
        //canActivateChild: [AuthGuard],
        children: [
          { path: 'exhibitors', component: ExhibitorsComponent },
          { path: 'exhibitors/:id', component: ExhibitorDetailComponent },
          { path: 'authors', component: AuthorsComponent },
          { path: 'authors/add', component: AuthorDetailComponent },
          { path: 'authors/:id', component: AuthorDetailComponent },
          { path: 'animations', component: AnimationsComponent },
          { path: 'animations/add', component: AnimationDetailComponent },
          { path: 'animations/:id', component: AnimationDetailComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(sdlRoutes),
    TranslateModule
  ],
  exports: [
    RouterModule,
    TranslatePipe
  ],
  providers: [TranslateModule]
})
export class EvSdlRoutingModule { }
