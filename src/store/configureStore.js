import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import messagesReducer from './reducers/messages';
import inventoriesReducer from './reducers/inventories';

const rootReducer = combineReducers({
    messages: messagesReducer,
    inventories: inventoriesReducer
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(reduxThunk));
}

export default configureStore;