import { LOAD_PRODUCTS, LOAD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../actions/actionTypes';


const initialState = {
    products: [],
    pagination: null,
    product: null
}


const reducer = (state = initialState, action) => {

    switch(action.type){

        case LOAD_PRODUCTS:
            return {
                ...state,
                products: action.products,
                pagination: action.pagination
            }
        
        case LOAD_PRODUCT:
            return {
                ...state,
                product: action.product
            }

        case UPDATE_PRODUCT:
            return {
                ...state,
                product: action.product
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                product: null
            }
        default:
            return state;
    }



}

export default reducer;