import axios from 'axios';
import {LOAD_INVENTORIES, LOAD_INVENTORY, SHOW_MESSAGES, UPDATE_INVENTORY, DELETE_INVENTORY} from './actionTypes';
import {InventoryBackendAPI} from '../../AppSettings';
import {convertFormToObject} from '../../helpers/helpers';

export const loadInventories = (pageNumber: number = 1) => async dispatch => {

    try {
        const uri = `${InventoryBackendAPI}/inventories?pageNumber=${pageNumber}`;
        const response = await axios.get(uri);

        dispatch({
            type: LOAD_INVENTORIES,
            inventories: response.data,
            pagination: JSON.parse(response.headers.pagination)
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

        const uri = `${InventoryBackendAPI}/inventories/${inventoryId}`;
        const response = await axios.get(uri);

        console.log('loadInventoryAction')
        console.log(response.data)

        dispatch({
            type: LOAD_INVENTORY,
            inventory: response.data
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
        const response = await axios.delete(uri);


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