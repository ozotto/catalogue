import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {BACKEND_URL} from '../constants';
import {catchError, tap} from 'rxjs/operators';
import {PermissionsHelper} from '../helpers/permissions.helper';
import {PermissionService} from '../services/permission.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private permissionservice: PermissionService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true

      // this.permissionservice.getExhibitorByUser().subscribe((permissions) => {
      //   console.log('permissions test');
      //   console.log(permissions);
      // });

      // const url = BACKEND_URL + '/exhibitor/exhibitors/';
      // return this.http.get<any>(url, httpOptions).pipe(
      //   tap(instance => { }),
      //   catchError(this.errorsHelper.handleError<any>('getExhibitorByUser'))
      // );
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
