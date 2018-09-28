import {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MessageService } from '../../sys/services/message.service';

import {BACKEND_URL} from '../../sys/constants';
import {ServicesHelper} from '../../sys/helpers/services.helper';


@Injectable({
  providedIn: 'root'
})
export class AutographService {
  private endpoint = BACKEND_URL + '/livre/autographs/';
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private serviceHelper: ServicesHelper
  ) { }



  /** GET Autographs from the server */
  getAutographs (): Observable<any[]> {
    return this.serviceHelper.getInstances(this.endpoint);
  }

  /** GET Autograph by id. Will 404 if id not found */
  getAutograph (instance: any | number): Observable<any> {
    return this.serviceHelper.getInstance(this.endpoint, instance);
  }

  /** POST: add a new Autograph to the server */
  addAutograph (instance: any): Observable<any> {
    return this.serviceHelper.addInstance(this.endpoint, instance);
  }

  // /** PUT: update the Autograph on the server */
  updateAutograph (instance: any): Observable<any> {
    return this.serviceHelper.updateInstance(this.endpoint, instance);
  }

  /** DELETE: delete the Autograph from the server */
  deleteAutograph (instance: any | number): Observable<any> {
    return this.serviceHelper.deleteInstance(this.endpoint, instance);
  }
}
