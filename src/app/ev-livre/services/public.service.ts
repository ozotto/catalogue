import {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MessageService } from '../../sys/services/message.service';

import {BACKEND_URL} from '../../sys/constants';
import {ServicesHelper} from '../../sys/helpers/services.helper';


@Injectable({
  providedIn: 'root'
})
export class PublicService {
  private endpoint = BACKEND_URL + '/livre/publics/';
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private serviceHelper: ServicesHelper
  ) { }



  /** GET Publics from the server */
  getPublics (): Observable<any[]> {
    return this.serviceHelper.getInstances(this.endpoint);
  }

  /** GET Public by id. Will 404 if id not found */
  getPublic (instance: any | number): Observable<any> {
    return this.serviceHelper.getInstance(this.endpoint, instance);
  }

  /** POST: add a new Public to the server */
  addPublic (instance: any): Observable<any> {
    return this.serviceHelper.addInstance(this.endpoint, instance);
  }

  // /** PUT: update the Public on the server */
  updatePublic (instance: any): Observable<any> {
    return this.serviceHelper.updateInstance(this.endpoint, instance);
  }

  /** DELETE: delete the Public from the server */
  deletePublic (instance: any | number): Observable<any> {
    return this.serviceHelper.deleteInstance(this.endpoint, instance);
  }
}
