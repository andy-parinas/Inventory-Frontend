import {LOAD_INVENTORIES, LOAD_INVENTORY, UPDATE_INVENTORY, DELETE_INVENTORY} from '../actions/actionTypes';

const initialState = {
    inventories: [],
    pagination: null,
    inventory: null
}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case LOAD_INVENTORIES:
            return {
                ...state,
                inventories: action.inventories,
                pagination: action.pagination
            }

        case LOAD_INVENTORY:
            return {
                ...state,
                inventory: action.inventory
            }
        
        case UPDATE_INVENTORY:
            return {
                ...this.state,
                inventory: action.updatedInventory
            }

        case DELETE_INVENTORY:
            return {
                ...this.state,
                inventory: null
            }

        default:
            return state;
    }


}

export default reducer;