import axios from 'axios';

import {LOAD_INVENTORIES,
    LOAD_INVENTORY, 
    SHOW_MESSAGES, 
    UPDATE_INVENTORY,
    DELETE_INVENTORY, 
    SHOW_LOADING, 
    HIDE_LOADING,
    LOAD_STATUS_OPTIONS,
    RESET_INVENTORIES} from './actionTypes';

import {InventoryBackendAPI} from '../../AppSettings';
import {convertFormToObject} from '../../helpers/helpers';

export const loadInventories = (pageNumber: number = 1, sort, search, callback) => async dispatch => {

    try {

        dispatch({
            type: SHOW_LOADING
        })
        
        let uri = `${InventoryBackendAPI}/inventories?pageNumber=${pageNumber}`;

        

        if(sort){
            if(sort.asc){
                uri = uri + `&orderBy=${sort.column}&direction=ASC`
            }else{
                uri = uri + `&orderBy=${sort.column}&direction=DESC`
            }
            
            if(search){
                uri = uri + `&${search}`;
            }
    
        }else {
            if(search){
                uri = uri + `?${search}`;
            }
        }

       
        console.log(uri);

        const response = await axios.get(uri);

        dispatch({
            type: LOAD_INVENTORIES,
            inventories: response.data,
            pagination: JSON.parse(response.headers.pagination)
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


export const resetInventories = (callback) => async dispatch => {
   dispatch({
       type: RESET_INVENTORIES
   })

   if(callback){
       callback();
   }
} 