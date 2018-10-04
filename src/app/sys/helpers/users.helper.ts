import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersHelper {
  constructor( ) { }

  /** Log a anyService message with the MessageService */
  public getUserInfo() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public getExhibitorId() {
    const userInfo = this.getUserInfo();
    console.log('userInfo');
    console.log(userInfo);
    return userInfo.exhibitor.id;
  }
}
