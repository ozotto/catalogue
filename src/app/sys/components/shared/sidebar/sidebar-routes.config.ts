import { RouteInfo } from './sidebar.metadata';
import {CanActivate} from '@angular/router';
import {AuthGuard} from '../../../guards/auth.guard';

export const ROUTES_ARTGENEVE: RouteInfo[] = [

    {
        path: '/', title: 'Main', icon: 'ft-layout', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    // {
    //     path: '/artgeneve', title: 'ArtGeneve', icon: 'ft-align-left', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    //     submenu: [
    //         { path: '/artgeneve/exhibitors', title: 'Exhibitors', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/artgeneve/art-represented', title: 'Represented Artists', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/artgeneve/art-exhibited', title: 'Exhibited Artists', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/artgeneve/artworks', title: 'Application Artworks', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/artgeneve/galeries', title: 'Galeries', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //     ]
    // },
    /*{
        path: '/changelog', title: 'ChangeLog', icon: 'ft-file', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },*/
];

export const ROUTES_LIVRE: RouteInfo[] = [

  {
    path: '/', title: 'Main', icon: 'ft-layout', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/livre', title: 'SalonDuLivre', icon: 'ft-align-left', class: 'has-sub open', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/livre/exhibitors', title: 'Exhibitors', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},
      { path: '/livre/animations', title: 'Animations', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},
    ]
  },
];
