import { LOAD_TRANSACTIONS, LOAD_TRANSACTION, CREATE_TRANSACTION } from '../actions/actionTypes';

const initalState = {
    transactions: [],
    transaction: null,
    pagination: null
}


const reducer = (state = initalState, action) => {

    switch(action.type) {

        case LOAD_TRANSACTIONS:
            return {
                ...state,
                transactions: action.transactions,
                pagination: action.pagination
            }
        
        case LOAD_TRANSACTION:
            return {
                ...state,
                transaction: action.transaction
            }

        case CREATE_TRANSACTION:
            return {
                ...state,
                transaction: action.transaction
            }
        default:
            return state;
    }

}

export default reducer;