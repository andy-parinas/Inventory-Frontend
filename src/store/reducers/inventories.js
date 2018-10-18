import {
    LOAD_INVENTORIES, 
    LOAD_INVENTORY, 
    UPDATE_INVENTORY, 
    DELETE_INVENTORY, 
    LOAD_STATUS_OPTIONS, 
    RESET_INVENTORIES,
    SET_INVENTORIES_FILTER,
    CLEAR_INVENTORIES_FILTER} from '../actions/actionTypes';

const initialState = {
    inventories: [],
    pagination: null,
    inventory: null,
    statusOptions: [],
    filters: null,
    sort: null
}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case LOAD_INVENTORIES:
            return {
                ...state,
                inventories: action.inventories,
                pagination: action.pagination,
                sort: {...action.sort}
            }

        case LOAD_INVENTORY:
            return {
                ...state,
                inventory: action.inventory
            }
        
        case UPDATE_INVENTORY:
            return {
                ...state,
                inventory: action.updatedInventory
            }

        case DELETE_INVENTORY:
            return {
                ...state,
                inventory: null
            }

        case LOAD_STATUS_OPTIONS:
            return {
                ...state,
                statusOptions: action.statusOptions
            }

        case RESET_INVENTORIES:
            return {
                ...state,
                inventories: [],
                pagination: null,
            }
        
        case SET_INVENTORIES_FILTER:
            return {
                ...state,
                filter: {
                    ...action.filter
                }
            }
        
        case CLEAR_INVENTORIES_FILTER: 
            return {
                ...state,
                filter: null
            }

        default:
            return state;
    }


}

export default reducer;