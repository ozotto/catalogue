import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Router Systeme
import { SysDashboardComponent }   from './sys-dashboard/sys-dashboard.component';

//Router Event - Artgeneve
/*import { EvArtgeneveComponent } from './ev-artgeneve/ev-artgeneve.component';*/

import { CanDeactivateGuard }       from './can-deactivate-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: SysDashboardComponent },
  { path: 'home', component: SysDashboardComponent },
  /*{ path: 'art', component: EvArtgeneveComponent },*/
  {
    path: 'artgeneve',
    loadChildren: './ev-artgeneve/ev-artgeneve.module#EvArtgeneveModule',
    //canLoad: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    //canLoad: [AuthGuard]
  },
  
];

/*@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})*/

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        enableTracing: true, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategy,

      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})

export class AppRoutingModule {}