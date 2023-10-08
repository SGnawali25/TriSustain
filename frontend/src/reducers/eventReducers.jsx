import { 
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_LOADING,
    CREATE_EVENT_FAIL,
    CLEAR_ERRORS, 
    LOAD_EVENTS_LOADING,
    LOAD_EVENTS_SUCCESS,
    LOAD_EVENTS_FAIL
} from '../constants/eventConstants';


export const createEventReducer = (state = {event: {} }, action) => {
    switch (action.type) {
        case CREATE_EVENT_LOADING:
            return {
                loading: true,
            }

        case CREATE_EVENT_SUCCESS:
            return {
               ...state,
                loading: false,
                event: action.payload,
            }

        case CREATE_EVENT_FAIL:
            return {
                ...state,
                loading: false,
                event: null,
                message: action.payload.message
                }

        case CLEAR_ERRORS:
            return {
               ...state,
                error: null
            }

        default:
            return state;
    }
}

export const eventsReducer = (state = {events: []}, action) =>{
    switch(action.type) {
        case LOAD_EVENTS_LOADING:
            return{
                ...state,
                loading: true
            }

        case LOAD_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: action.payload
            }

        case LOAD_EVENTS_FAIL:
            return {
                ...state,
                loading: false,
                events: null
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}