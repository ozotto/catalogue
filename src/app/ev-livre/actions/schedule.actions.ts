import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Schedule } from '../models/schedule';

//Test load WebService
import { ListPublic } from '../models/public';

export const CREATE_SCHEDULE = 'Schedule_Create';
export const DELETE_SCHEDULE = 'Schedule_Delete';

export const GET_PUBLIC = 'Get_Public';
export const SUCCESS_INIT_PUBLIC = 'Init_Public';
export const ERROR_LOAD_ACTION = '[matiereList] Error Load Action'

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

export class SuccessInitPublic {
    readonly  type = SUCCESS_INIT_PUBLIC;
    constructor( public payload: ListPublic[]) {}
}

export class ErrorLoadAction {
	readonly type = ERROR_LOAD_ACTION;
	constructor(public payload: HttpErrorResponse) {}
}

export type Actions = CreateSchedule | DeleteSchedule | GetPublic | SuccessInitPublic | ErrorLoadAction;
