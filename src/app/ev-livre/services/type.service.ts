import {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MessageService } from '../../sys/services/message.service';

import {BACKEND_URL} from '../../sys/constants';
import {ServicesHelper} from '../../sys/helpers/services.helper';


@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private endpoint = BACKEND_URL + '/livre/types/';
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private serviceHelper: ServicesHelper
  ) { }



  /** GET Types from the server */
  getTypes (): Observable<any[]> {
    return this.serviceHelper.getInstances(this.endpoint);
  }

  /** GET Type by id. Will 404 if id not found */
  getType (instance: any | number): Observable<any> {
    return this.serviceHelper.getInstance(this.endpoint, instance);
  }

  /** POST: add a new Type to the server */
  addType (instance: any): Observable<any> {
    return this.serviceHelper.addInstance(this.endpoint, instance);
  }

  // /** PUT: update the Type on the server */
  updateType (instance: any): Observable<any> {
    return this.serviceHelper.updateInstance(this.endpoint, instance);
  }

  /** DELETE: delete the Type from the server */
  deleteType (instance: any | number): Observable<any> {
    return this.serviceHelper.deleteInstance(this.endpoint, instance);
  }
}
