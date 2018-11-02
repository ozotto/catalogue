import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Schedule } from '../models/schedule';

//Test load WebService
import { ListPublic } from '../models/public';

export const CREATE_SCHEDULE = 'Schedule_Create';
export const DELETE_SCHEDULE = 'Schedule_Delete';

export const GET_PUBLIC = 'Get_Public';

export class CreateSchedule implements Action {
    readonly type = CREATE_SCHEDULE;

    constructor(public payload: Schedule) { }
}

export class DeleteSchedule implements Action {
    readonly type = DELETE_SCHEDULE;

    constructor(public id: number) { }
}

export class GetPublic implements Action {
    readonly type = GET_PUBLIC;

    constructor(public payload: ListPublic[]) { };
}

export type Actions = CreateSchedule | DeleteSchedule | GetPublic;
