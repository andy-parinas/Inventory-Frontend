import { combineReducers, createStore } from 'redux';

import messagesReducer from './reducers/messages';

const rootReducer = combineReducers({
    messages: messagesReducer
});

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;