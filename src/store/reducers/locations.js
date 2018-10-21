import {LOAD_LOCATIONS, LOAD_LOCATION, LOAD_LOCATION_TYPES} from '../actions/actionTypes';

const initialState = {
    locations: [],
    location: null,
    locationTypes: [],
    pagination: null,
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case LOAD_LOCATIONS:
            return {
                ...state,
                locations: action.locations,
                pagination: action.pagination
            }

        case LOAD_LOCATION: 
            return {
                ...state,
                location: action.location
            }

        case LOAD_LOCATION_TYPES:
            return {
                ...state,
                locationTypes: action.locationTypes
            }
        default:
            return state;
    }



}

export default reducer;