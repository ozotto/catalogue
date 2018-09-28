import {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MessageService } from '../../sys/services/message.service';

import {BACKEND_URL} from '../../sys/constants';
import {ServicesHelper} from '../../sys/helpers/services.helper';


@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private endpoint = BACKEND_URL + '/livre/animations/';
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private serviceHelper: ServicesHelper
  ) { }



  /** GET Animations from the server */
  getAnimations (): Observable<any[]> {
    return this.serviceHelper.getInstances(this.endpoint);
  }

  /** GET Animation by id. Will 404 if id not found */
  getAnimation (instance: any | number): Observable<any> {
    return this.serviceHelper.getInstance(this.endpoint, instance);
  }

  /** POST: add a new Animation to the server */
  addAnimation (instance: any): Observable<any> {
    return this.serviceHelper.addInstance(this.endpoint, instance);
  }

  // /** PUT: update the Animation on the server */
  updateAnimation (instance: any): Observable<any> {
    return this.serviceHelper.updateInstance(this.endpoint, instance);
  }

  /** DELETE: delete the Animation from the server */
  deleteAnimation (instance: any | number): Observable<any> {
    return this.serviceHelper.deleteInstance(this.endpoint, instance);
  }
}
