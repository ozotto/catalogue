import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TranslateModule, TranslatePipe} from '@ngx-translate/core';

import {EvLivreComponent} from '../ev-livre.component';
import {ExhibitorsComponent} from '../components/exhibitors/exhibitors.component';
import {ExhibitorDetailComponent} from '../components/exhibitors/exhibitor-detail/exhibitor-detail.component';
import {AuthorsComponent} from '../components/authors/authors.component';
import {AuthorDetailComponent} from '../components/authors/author-detail/author-detail.component';
import {AnimationsComponent} from '../components/animations/animations.component';
import {AnimationDetailComponent} from '../components/animations/animation-detail/animation-detail.component';
import {AutographDetailComponent} from '../components/autographs/autograph-detail/autograph-detail.component';
import {AutographsComponent} from '../components/autographs/autographs.component';


const livreRoutes: Routes = [
  {
    path: '',
    component: EvLivreComponent,
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
          { path: 'autographs', component: AutographsComponent },
          { path: 'autographs/add', component: AutographDetailComponent },
          { path: 'autographs/:id', component: AutographDetailComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(livreRoutes),
    TranslateModule
  ],
  exports: [
    RouterModule,
    TranslatePipe
  ],
  providers: [TranslateModule]
})
export class EvLivreRoutingModule { }
