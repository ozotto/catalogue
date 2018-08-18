import { Routes, RouterModule } from '@angular/router';

export const Full_ROUTES: Routes = [
  {
    path: 'artgeneve',
    loadChildren: './ev-artgeneve/ev-artgeneve.module#EvArtgeneveModule'
  },
  /*{
    path: 'changelog',
    loadChildren: './changelog/changelog.module#ChangeLogModule'
  },*/
  /*{
    path: 'full-layout',
    loadChildren: './pages/full-layout-page/full-pages.module#FullPagesModule'
  },*/
];