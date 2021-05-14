import {createStore, combineReducers} from 'redux';
import loginReducer from './reducers/loginReducer';
import contactsReducer from './reducers/contactsReducer';

let reducers = combineReducers({
    loginData: loginReducer,
    contactsData: contactsReducer
});

let store = createStore(reducers);

export default store;