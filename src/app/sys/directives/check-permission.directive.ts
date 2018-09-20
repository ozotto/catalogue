import { Directive, ElementRef } from '@angular/core';
import { PermissionService } from '../services/permission.service';

@Directive({
  selector: '[appShowIfSuperUser]'
})
export class CheckPermissionDirective {

  constructor(Element: ElementRef, permissionservice: PermissionService) {
    Element.nativeElement.style.display = 'none';
    let groups: any[] = [];

    permissionservice.getByToken().subscribe((currentUser) => {
      console.log(currentUser);

      groups = currentUser.user.groups;
      console.log('groups');
      console.log(groups);

      const isModerator = groups.some(e => e.name === 'moderator');
      const isAdmin = groups.some(e => e.name === 'administrator');

      const hasAccess = isModerator || isAdmin;

      if (hasAccess) {
        Element.nativeElement.style.display = 'block';
      } else {
        Element.nativeElement.remove();
      }

    });


  }
}
