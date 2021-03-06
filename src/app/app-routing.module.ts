import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Full_ROUTES } from './sys/routes/full-layout.routes';

import { FullLayoutComponent } from './sys/components/layouts/full/full-layout.component'
import { HomeComponent } from './sys/components/home/home.component';
import { LoginComponent } from './sys/components/login/login.component';
import { AuthGuard } from './sys/guards/auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
  /*{ path: 'full', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
  /*{
    path: 'artgeneve',
    loadChildren: './ev-artgeneve/ev-artgeneve.module#EvArtgeneveModule',
    canActivate: [AuthGuard]
  }*/
];

// export const routing = RouterModule.forRoot(appRoutes);

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
