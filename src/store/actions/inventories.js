import axios from 'axios';

import {LOAD_INVENTORIES,
    LOAD_INVENTORY, 
    SHOW_MESSAGES, 
    UPDATE_INVENTORY,
    DELETE_INVENTORY, 
    SHOW_LOADING, 
    HIDE_LOADING,
    LOAD_STATUS_OPTIONS,
    SET_INVENTORIES_FILTER,
    CLEAR_INVENTORIES_FILTER} from './actionTypes';

import {InventoryBackendAPI} from '../../AppSettings';
import {convertFormToObject} from '../../helpers/helpers';

export const loadInventories = (pageNumber: number = 1, sort, filter, callback) => async dispatch => {

    try {

        dispatch({
            type: SHOW_LOADING
        })
        
        let uri = `${InventoryBackendAPI}/inventories?pageNumber=${pageNumber}`;
        let filterParams = ''


        for(const property in filter){
            const safeValue = encodeURIComponent(filter[property]);
            filterParams = filterParams + `${property}=${safeValue}&`
        }

      
        if(sort.asc){
            uri = uri + `&orderBy=${sort.column}&direction=ASC`
        }else{
            uri = uri + `&orderBy=${sort.column}&direction=DESC`
        }

        if(filter){
            uri = uri + `&${filterParams}`;

            //If there is a search parameter, then the filter was used.
            //Dispatch the Setting of the Filter in the Reducer.
            dispatch({
                type: SET_INVENTORIES_FILTER,
                filter: filter
            })

        }else{

            //No Filters was set, either the component that calls the action was just refreshed or
            //the filters was cleared. Dispatch the reducer that will clear the filter.
            dispatch({
                type: CLEAR_INVENTORIES_FILTER
            })

        }


        const response = await axios.get(uri);

        dispatch({
            type: LOAD_INVENTORIES,
            inventories: response.data,
            pagination: JSON.parse(response.headers.pagination),
            sort: sort
        })


        if(callback){
            callback();
        }
        

        dispatch({
            type: HIDE_LOADING
        })

    }catch(error) {

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'error',
            messages: ['Error Loading Inventories']
        })
    }

}


export const loadInventory = (inventoryId: number) => async dispatch => {

    try {

        dispatch({
            type: SHOW_LOADING
        })

        const uri = `${InventoryBackendAPI}/inventories/${inventoryId}`;
        const response = await axios.get(uri);
        dispatch({
            type: LOAD_INVENTORY,
            inventory: response.data
        })

        dispatch({
            type: HIDE_LOADING
        })

    }catch(error) {

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'error',
            messages: ['Error Loading Inventory with id of: ' + inventoryId]
        })
        
    }

}


export const updateInventory = (inventoryId: number, inventoryForm, callback) => async dispatch => {

    try{

        dispatch({
            type: SHOW_LOADING
        })

        const inventoryUpdate = {
            product: '',
            sku: '',
            thresholdWarning: 0,
            thresholdCritical: 0,
            location: ''
        }

        convertFormToObject(inventoryForm, inventoryUpdate);

        const uri = `${InventoryBackendAPI}/inventories/${inventoryId}`
        const response = await axios.put(uri, inventoryUpdate);

        dispatch({
            type: UPDATE_INVENTORY,
            updatedInventory: response.data
        });

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'success',
            messages: ['Successfuly updated inventory']
        });

        callback();

        dispatch({
            type: HIDE_LOADING
        })

    }catch(error){

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'error',
            messages: ['Error Updating Inventory with id of: ' + inventoryId]
        })

    }


}


export const deleteInventory = (inventoryId, callback) => async dispatch => {

    try{
        const uri = `${InventoryBackendAPI}/inventories/${inventoryId}`;
        await axios.delete(uri);


        dispatch({
            type: DELETE_INVENTORY
        })

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'success',
            messages: ['Successfuly deleted inventory']
        });


        callback();

    }catch(error){

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'error',
            messages: ['Error deleting Inventory with id of: ' + inventoryId]
        })

    }

}

export const loadStatusOptions = () => async dispatch => {

    try{

        const uri = `${InventoryBackendAPI}/inventories/statuses`;
        const response = await axios.get(uri);

        dispatch({
            type: LOAD_STATUS_OPTIONS,
            statusOptions: response.data
        })

    }catch(error){

        console.log('Error Loading Status Options', error.response || error);
    }


}


