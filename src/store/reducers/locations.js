import {LOAD_LOCATIONS, LOAD_LOCATION} from '../actions/actionTypes';

const initialState = {
    locations: [],
    location: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case LOAD_LOCATIONS:
            return {
                ...state,
                locations: action.locations
            }

        case LOAD_LOCATION: 
            return {
                ...state,
                location: action.location
            }
        default:
            return state;
    }



}

export default reducer;