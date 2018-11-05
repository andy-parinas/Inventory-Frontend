import { LOAD_PRODUCTS, LOAD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, CREATE_PRODUCT, LOAD_PRODUCT_CATEGORIES, CREATE_PRODUCT_CATEGORY, UPDATE_PRODUCT_CATEGORY, DELETE_PRODUCT_CATEGORY,  } from '../actions/actionTypes';


const initialState = {
    products: [],
    pagination: null,
    product: null,
    categories: []
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

        case CREATE_PRODUCT:
            return {
                ...state,
                product: action.product
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                product: null
            }

        case LOAD_PRODUCT_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }

        case CREATE_PRODUCT_CATEGORY:
            console.log("Creating Product Category")
            return {
                ...state,
                categories: [...state.categories, action.category]
            }

        case UPDATE_PRODUCT_CATEGORY:
            const updateIndex = state.categories.find(c => c.id === action.id)
            state.categories.splice(updateIndex, 1, action.category);

            return {
                ...state
            }
        
        case DELETE_PRODUCT_CATEGORY:
            const delIndex =  state.categories.findIndex(c => c.id === action.id);
            state.categories.splice(delIndex, 1);

            return {
                ...state
            }

        default:
            return state;
    }



}

export default reducer;