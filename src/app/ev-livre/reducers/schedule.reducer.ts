import {Schedule} from '../models/schedule';
import { ListPublic } from '../models/public';

//import { Actions, CREATE_SCHEDULE, DELETE_SCHEDULE } from '../actions/schedule.actions';
import * as LivreActions from '../actions/schedule.actions';

/*const initialState: Schedule = { 
    id: 10,
    date_start: '27-10-2019',
    date_end: '28-10-2019',
    animation: [],
};*/

export interface State {
    id: number;
    date_start: string;
    date_end: string;
    animation: any[];
    loading: boolean;
    searchTerms: string;
    results: ListPublic[];
    schedule : Schedule[];
};

const initialState: State =  {
    id: 10,
    date_start: '27-10-2019',
    date_end: '28-10-2019',
    animation: [],
    loading: false,
    searchTerms: '',
    results: [],
    schedule: []
}

export function reducer(state = initialState, action: LivreActions.Actions): State {
/*export function reducer(
    //state: Schedule[] = [initialState],
    state: Schedule[] = [],
    action: LivreActions.Actions)  {*/
    console.log('in reducer')

    switch (action.type) {
        /*case LivreActions.CREATE_SCHEDULE:
            return [...state, action.payload];*/

        case LivreActions.CREATE_SCHEDULE: {
            return {
                ...state, 
                schedule : [...state.schedule]           
            }
        }

        /*case LivreActions.DELETE_SCHEDULE:
            return state.filter(({ id }) => id !== action.id);*/
        case LivreActions.DELETE_SCHEDULE: {
            return {
                ...state,
                schedule : state.schedule.filter(({ id }) => id !== action.id)
            }
        }

        case LivreActions.GET_PUBLIC: {
            return {
                ...state,
                loading: false,
                results: action.payload
            }
        }        

        default:
            return state;
    }
}

