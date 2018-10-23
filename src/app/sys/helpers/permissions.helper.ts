/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../services/message.service';
import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import { PermissionService } from '../services/permission.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PermissionsHelper {
  constructor(
    private messageService: MessageService,
    private permissionservice: PermissionService
  ) { }

  public showIfSuperUser () {
    this.permissionservice.getUserInfoByToken().subscribe((currentUser) => {
      console.log(currentUser);
      let groups: any[] = [];

      groups = currentUser.user.groups;
      console.log('groups');
      console.log(groups);

      const isModerator = groups.some(e => e.name === 'moderator');
      const isAdmin = groups.some(e => e.name === 'administrator');

      const hasAccess = isModerator || isAdmin;

      if (hasAccess) {
        console.log("helper");
        console.log("true");
        return true;
      } else {
        console.log("helper");
        console.log("false");
        return false;
      }

    });
  }


  public showIfAutorized () {
    this.permissionservice.getExhibitorByUser().subscribe((currentUser) => {
      console.log(currentUser);

      // let event: any[] = [];
      //
      // event = currentUser.user.event;
      // console.log('event');
      // console.log(event);
      //
      // const isModerator = event.some(e => e.name === 'moderator');
      // const isAdmin = event.some(e => e.name === 'administrator');
      //
      // const hasAccess = isModerator || isAdmin;

      // if (hasAccess) {
      //   console.log("helper");
      //   console.log("true");
      //   return true;
      // } else {
      //   console.log("helper");
      //   console.log("false");
      //   return false;
      // }

    });
  }

}
