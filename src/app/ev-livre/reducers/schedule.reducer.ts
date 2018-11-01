import {Schedule} from '../models/schedule';

import { Actions, CREATE_CUSTOMER, DELETE_CUSTOMER } from '../actions/schedule.actions';

const initialState: Schedule = { 
    id: 10,
    date_start: '27-10-2019',
    date_end: '28-10-2019',
    animation: [],
};

export function reducer(
    state: Schedule[] = [initialState],
    action: Actions) {
    console.log('in reducer')
    switch (action.type) {
        case CREATE_CUSTOMER:
            return [...state, action.payload];

        case DELETE_CUSTOMER:
            return state.filter(({ id }) => id !== action.id);

        default:
            return state;
    }
}