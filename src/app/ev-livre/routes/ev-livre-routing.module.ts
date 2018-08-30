import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

import { EvLivreComponent } from '../ev-livre.component';
import { ExhibitorsComponent } from '../components/exhibitors/exhibitors.component';
import { ExhibitorDetailComponent } from '../components/exhibitors/exhibitor-detail/exhibitor-detail.component';


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
          // { path: 'authors', component: AuthorsComponent },
          // { path: 'authors/add', component: AuthorDetailComponent },
          // { path: 'authors/:id', component: AuthorDetailComponent },
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
