import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import messagesReducer from './reducers/messages';
import inventoriesReducer from './reducers/inventories';
import transactionReducer from './reducers/transactions';
import loadingReducer from './reducers/loading';
import productReducer from './reducers/products';

const rootReducer = combineReducers({
    messages: messagesReducer,
    inventories: inventoriesReducer,
    transactions: transactionReducer,
    products: productReducer,
    loading: loadingReducer
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(reduxThunk));
}

export default configureStore;