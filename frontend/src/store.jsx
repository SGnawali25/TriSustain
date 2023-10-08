import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {composeWithDevTools} from'redux-devtools-extension';
import { authReducer, registerUserReducer} from './reducers/userReducers';
import { createEventReducer, eventReducer, eventsReducer } from './reducers/eventReducers';

const reducer = combineReducers({
    auth: authReducer,
    registerUser: registerUserReducer,
    create_event: createEventReducer,
    all_events: eventsReducer,
    event: eventReducer
})

let initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;