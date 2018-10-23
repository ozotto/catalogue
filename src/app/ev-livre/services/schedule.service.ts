import {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MessageService } from '../../sys/services/message.service';

import {BACKEND_URL} from '../../sys/constants';
import {ServicesHelper} from '../../sys/helpers/services.helper';


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private endpoint = BACKEND_URL + '/livre/schedules/';
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private serviceHelper: ServicesHelper
  ) { }



  /** GET Schedules from the server */
  getSchedules (id_filter: number = null): Observable<any[]> {
    if (id_filter) {
      return this.serviceHelper.getInstances(this.endpoint + '?animation_id=' + id_filter);
    } else {
      return this.serviceHelper.getInstances(this.endpoint);
    }
  }

  /** GET Schedule by id. Will 404 if id not found */
  getSchedule (instance: any | number): Observable<any> {
    return this.serviceHelper.getInstance(this.endpoint, instance);
  }

  /** POST: add a new Schedule to the server */
  addSchedule (instance: any): Observable<any> {
    return this.serviceHelper.addInstance(this.endpoint, instance);
  }

  // /** PUT: update the Schedule on the server */
  updateSchedule (instance: any): Observable<any> {
    return this.serviceHelper.updateInstance(this.endpoint, instance);
  }

  /** DELETE: delete the Schedule from the server */
  deleteSchedule (instance: any | number): Observable<any> {
    return this.serviceHelper.deleteInstance(this.endpoint, instance);
  }
}
