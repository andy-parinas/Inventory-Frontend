import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import messagesReducer from './reducers/messages';
import inventoriesReducer from './reducers/inventories';
import transactionReducer from './reducers/transactions';
import loadingReducer from './reducers/loading';
import productReducer from './reducers/products';
import locationReducer from './reducers/locations';
import authReducer from './reducers/authentication';

const rootReducer = combineReducers({
    messages: messagesReducer,
    inventories: inventoriesReducer,
    transactions: transactionReducer,
    products: productReducer,
    locations: locationReducer,
    loading: loadingReducer,
    auth: authReducer
});

const configureStore = () => {
    return createStore(rootReducer, {
        auth: {
            authenticated: localStorage.getItem('token')? true : false,
            token: localStorage.getItem('token'),
            userName: localStorage.getItem('userName')
        }
    }, applyMiddleware(reduxThunk));
}

export default configureStore;