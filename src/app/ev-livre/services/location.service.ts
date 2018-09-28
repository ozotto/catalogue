import {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MessageService } from '../../sys/services/message.service';

import {BACKEND_URL} from '../../sys/constants';
import {ServicesHelper} from '../../sys/helpers/services.helper';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private endpoint = BACKEND_URL + '/livre/locations/';
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private serviceHelper: ServicesHelper
  ) { }



  /** GET Locations from the server */
  getLocations (): Observable<any[]> {
    return this.serviceHelper.getInstances(this.endpoint);
  }

  /** GET Location by id. Will 404 if id not found */
  getLocation (instance: any | number): Observable<any> {
    return this.serviceHelper.getInstance(this.endpoint, instance);
  }

  /** POST: add a new Location to the server */
  addLocation (instance: any): Observable<any> {
    return this.serviceHelper.addInstance(this.endpoint, instance);
  }

  // /** PUT: update the Location on the server */
  updateLocation (instance: any): Observable<any> {
    return this.serviceHelper.updateInstance(this.endpoint, instance);
  }

  /** DELETE: delete the Location from the server */
  deleteLocation (instance: any | number): Observable<any> {
    return this.serviceHelper.deleteInstance(this.endpoint, instance);
  }
}
