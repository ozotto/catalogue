import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Schedule } from '../models/schedule';

export const CREATE_SCHEDULE = 'Schedule_Create';
export const DELETE_SCHEDULE = 'Schedule_Delete';

export class CreateSchedule implements Action {
    readonly type = CREATE_SCHEDULE;

    constructor(public payload: Schedule) { }
}

export class DeleteSchedule implements Action {
    readonly type = DELETE_SCHEDULE;

    constructor(public id: number) { }
}

export type Actions = CreateSchedule | DeleteSchedule;
