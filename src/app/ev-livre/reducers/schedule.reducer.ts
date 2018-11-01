import {Schedule} from '../models/schedule';

import { Actions, CREATE_SCHEDULE, DELETE_SCHEDULE } from '../actions/schedule.actions';

const initialState: Schedule = { 
    id: 10,
    date_start: '27-10-2019',
    date_end: '28-10-2019',
    animation: [],
};

export function reducer(
    //state: Schedule[] = [initialState],
    state: Schedule[] = [],
    action: Actions) {
    console.log('in reducer')
    switch (action.type) {
        case CREATE_SCHEDULE:
            return [...state, action.payload];

        case DELETE_SCHEDULE:
            return state.filter(({ id }) => id !== action.id);

        default:
            return state;
    }
}