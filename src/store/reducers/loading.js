import { SHOW_LOADING, HIDE_LOADING } from '../actions/actionTypes';

const initialState = {
    isLoading: false
}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case SHOW_LOADING: 
            return {
                ...state,
                isLoading: true
            }
        
        case HIDE_LOADING:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }

}

export default reducer;