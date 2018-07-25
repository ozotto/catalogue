import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Router Systeme

//Router Event - Artgeneve
/*import { EvArtgeneveComponent } from './ev-artgeneve/ev-artgeneve.component';*/

import { CanDeactivateGuard }       from './can-deactivate-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import {AuthGuard} from './sys/guards/auth.guard';
import {LoginComponent} from './sys/components/login/login.component';
import {HomeComponent} from './sys/components/home/home.component';
import {AppComponent} from './app.component';
import {DashboardComponent} from './sys/components/dashboard/dashboard.component';

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  /*{ path: 'art', component: EvArtgeneveComponent },*/
  {
    path: 'artgeneve',
    loadChildren: './ev-artgeneve/ev-artgeneve.module#EvArtgeneveModule',
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'artmontecarlo',
  //   loadChildren: './ev-artmontecarlo/ev-artmontecarlo.module#EvArtmontecarloModule',
  //   //canLoad: [AuthGuard]
  // },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
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
  ],
  bootstrap: [AppComponent]
})

export class AppRoutingModule {}
