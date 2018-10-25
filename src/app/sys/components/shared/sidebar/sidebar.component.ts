import { Component, OnInit } from '@angular/core';
import { ROUTES_ARTGENEVE, ROUTES_LIVRE} from './sidebar-routes.config';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import {PermissionService} from '../../../services/permission.service';

declare var $: any;
@Component({
    // moduleId: module.id,
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    currentPermission: string;
    constructor(private router: Router,
                private route: ActivatedRoute,
                private permissionservice: PermissionService) {
      this.currentPermission = 'user';


    }

    ngOnInit() {
        $.getScript('./assets/js/app-sidebar.js');
        // this.menuItems = ROUTES.filter(menuItem => menuItem);


        const event_name = localStorage.getItem('event_name');

        switch (event_name) {
          case 'livre': {
            this.menuItems = ROUTES_LIVRE.filter(menuItem => menuItem);
            break;
          }
          case 'artgeneve': {
            this.menuItems = ROUTES_ARTGENEVE.filter(menuItem => menuItem);
            break;
          }
          default: {
            //statements;
            break;
          }
        }




    }

}
