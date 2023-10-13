import axios from 'axios';


import { 
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_LOADING,
    CREATE_EVENT_FAIL,
    LOAD_EVENTS_LOADING,
    LOAD_EVENTS_SUCCESS,
    LOAD_EVENTS_FAIL,
    LOAD_EVENT_FAIL,
    LOAD_EVENT_LOADING,
    LOAD_EVENT_SUCCESS,
    CLEAR_ERRORS 
} from '../constants/eventConstants';


//create event

export const create_event = (props) => async (dispatch) => {
    try{
        const {name, eventStartDate, eventEndDate, host, location, description, xToEarn, price, eventType} = props;

        dispatch({type: CREATE_EVENT_LOADING})

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }

        const {data} = await axios.post(`https://trisustain.vercel.app/api/v1/register/event`, {name, eventStartDate, eventEndDate, host, location, description, xToEarn, price, eventType} ,  config)

        dispatch({
            type: CREATE_EVENT_SUCCESS,
            payload: data.event,

        })


    } catch (error){
        dispatch({
            type: CREATE_EVENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const load_events = () => async (dispatch) => {
    try{
       

        dispatch({type: LOAD_EVENTS_LOADING})


        const {data} = await axios.get(`https://trisustain.vercel.app/api/v1/events`);

        dispatch({
            type: LOAD_EVENTS_SUCCESS,
            payload: data.events,

        })


    } catch (error){
        dispatch({
            type: LOAD_EVENTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const load_event = (id) => async (dispatch) => {
    try{
       

        dispatch({type: LOAD_EVENT_LOADING})

        const {data} = await axios.get(`https://trisustain.vercel.app/api/v1/event/${id}`);

        dispatch({
            type: LOAD_EVENT_SUCCESS,
            payload: data.event,

        })


    } catch (error){
        dispatch({
            type: LOAD_EVENTS_FAIL,
            payload: error.response.data.message
        })
    }
}



export const clearErrors = () => async (dispatch) => {

    dispatch({
            type: CLEAR_ERRORS
        })
}