import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import messagesReducer from './reducers/messages';
import inventoriesReducer from './reducers/inventories';
import transactionReducer from './reducers/transactions';
import loadingReducer from './reducers/loading';
import productReducer from './reducers/products';
import locationReducer from './reducers/locations';

const rootReducer = combineReducers({
    messages: messagesReducer,
    inventories: inventoriesReducer,
    transactions: transactionReducer,
    products: productReducer,
    locations: locationReducer,
    loading: loadingReducer
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(reduxThunk));
}

export default configureStore;