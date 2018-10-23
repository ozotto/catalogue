import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
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

      this.permissionservice.getExhibitorByUser().subscribe((permissions) => {
        console.log('permissions test');
        console.log(permissions);
      });

    }

    ngOnInit() {
        $.getScript('./assets/js/app-sidebar.js');
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

}
