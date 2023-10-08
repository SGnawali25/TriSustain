import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {composeWithDevTools} from'redux-devtools-extension';
import { authReducer, registerUserReducer} from './reducers/userReducers';
import { createEventReducer, eventsReducer } from './reducers/eventReducers';

const reducer = combineReducers({
    auth: authReducer,
    registerUser: registerUserReducer,
    events: createEventReducer,
    all_events: eventsReducer
})

let initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;