import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Router Systeme
import { SysDashboardComponent }   from './sys-dashboard/sys-dashboard.component';

//Router Event - Artgeneve
import { EvArtgeneveComponent } from './ev-artgeneve/ev-artgeneve.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: SysDashboardComponent },
  { path: 'artgeneve', component: EvArtgeneveComponent },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}