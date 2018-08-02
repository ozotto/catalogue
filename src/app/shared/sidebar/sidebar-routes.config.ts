import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

    {
        path: '/', title: 'Main', icon: 'ft-layout', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '', title: 'ArtGeneve', icon: 'ft-align-left', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: 'artgeneve/exhibitors', title: 'Exhibitor', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: 'artgeneve/art-represented', title: 'Represented Artists', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: 'artgeneve/art-exhibited', title: 'Exhibited Artists', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: 'artgeneve/artworks', title: 'Application Artworks', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: 'artgeneve/galeries', title: 'Galeries', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
        ]
    },
];
