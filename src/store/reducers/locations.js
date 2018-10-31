import {LOAD_LOCATIONS, LOAD_LOCATION, LOAD_LOCATION_TYPES, UPDATE_LOCATION, CREATE_LOCATION, CREATE_LOCATION_TYPE, UPDATE_LOCATION_TYPE, DELETE_LOCATION_TYPE} from '../actions/actionTypes';

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

        case CREATE_LOCATION:
            return {
                ...state,
                locations: [...state.locations, action.location]
            }

        case UPDATE_LOCATION:
            const locIndex = state.locations.findIndex(l => l.id === action.id);
                
            state.locations.splice(locIndex, 1, action.locationType )
            
            return {
                ...state
            }

        case CREATE_LOCATION_TYPE:
            return {
                ...state,
                locationTypes: [...state.locationTypes, action.locationType]
            }

        case UPDATE_LOCATION_TYPE:
            const index = state.locationTypes.findIndex(l => l.id === action.id);
            
            state.locationTypes.splice(index, 1, action.locationType )
            
            return {
                ...state
            }
        case DELETE_LOCATION_TYPE:
            const delIndex = state.locationTypes.findIndex(l => l.id === action.id);
            state.locationTypes.splice(delIndex, 1)

            return {
                ...state
            }

        default:
            return state;
    }



}

export default reducer;