import axios from 'axios';

import {InventoryBackendAPI} from '../../AppSettings';
import {convertFormToObject} from '../../helpers/helpers';

import { LOAD_TRANSACTIONS, 
    SHOW_MESSAGES, 
    LOAD_TRANSACTION, 
    CREATE_TRANSACTION, 
    LOAD_INVENTORY, 
    SHOW_LOADING, 
    HIDE_LOADING, 
    UPDATE_TRANSACTION} from './actionTypes';


export const loadTransactions = (inventoryId, pageNumber: number = 1) => async dispatch => {

    try{

        const uri = `${InventoryBackendAPI}/inventories/${inventoryId}/transactions?pageNumber=${pageNumber}`;
        const response = await axios.get(uri);

        dispatch({
            type: LOAD_TRANSACTIONS,
            transactions: response.data,
            pagination: JSON.parse(response.headers.pagination)
        })

    }catch(error) {

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'error',
            messages: ['Error loading transactions']
        })

    }

}


export const loadTransaction = (transactionId) => async dispatch => {

    try{
        const uri = `${InventoryBackendAPI}/transactions/${transactionId}`;
        const response = await axios.get(uri);

        dispatch({
            type: LOAD_TRANSACTION,
            transaction: response.data
        })


    }catch(error) {

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'error',
            messages: ['Error loading transaction']
        })

    }


} 


export const createTransaction = (inventoryId, transactionForm, callback) => async dispatch => {

    try{

        dispatch({
            type: SHOW_LOADING
        })

        const newTransaction = {
            transaction: 0,
            quantity: 0,
            details: ''
        }

        convertFormToObject(transactionForm, newTransaction);

        const uri = `${InventoryBackendAPI}/inventories/${inventoryId}/transactions`;
        const response = await axios.post(uri, newTransaction);

        dispatch({
            type: CREATE_TRANSACTION,
            transaction: response.data
        })

        dispatch({
            type: LOAD_INVENTORY,
            inventory: response.data.inventory
        })

        callback();

        dispatch({
            type: HIDE_LOADING
        })

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'success',
            messages: ['Successfuly created transaction']
        })


    }catch(error) {

        console.log('Transaction Create Error', error.response);
        
        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'error',
            messages: error.response? error.response.data.error : ['Unknown Error Encountered']
        })

        dispatch({
            type: HIDE_LOADING
        })

    }


}

export const updateTransaction = (inventoryId, transactionId, transactionForm, callback) => async dispatch => {

    try{

        
        dispatch({
            type: SHOW_LOADING
        })

        const transaction = {
            transaction: 0,
            quantity: 0,
            details: ''
        }

        convertFormToObject(transactionForm, transaction);

        const uri = `${InventoryBackendAPI}/inventories/${inventoryId}/transactions/${transactionId}`;
        const response = await axios.put(uri, transaction);

        dispatch({
            type: UPDATE_TRANSACTION,
            transaction: response.data
        })

        dispatch({
            type: LOAD_INVENTORY,
            inventory: response.data.inventory
        })

        dispatch({
            type: HIDE_LOADING
        })

        callback();

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'success',
            messages: ['Successfuly updated transaction']
        })


    }catch(error){

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'error',
            messages: error.response? error.response.data.error : ['Unknown Error Encountered']
        })

        dispatch({
            type: HIDE_LOADING
        })

    }
}


export const deleteTransction = (transactionId, callback) => async dispatch => {

    try{

        dispatch({
            type: SHOW_LOADING
        })


        const uri = `${InventoryBackendAPI}/transactions/${transactionId}`;

        const response = await axios.delete(uri);

        dispatch({
            type: LOAD_INVENTORY,
            inventory: response.data.inventory
        })

        dispatch({
            type: HIDE_LOADING
        })

        callback();

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'success',
            messages: ['Successfuly deleted transaction']
        })


    }catch(error){

        dispatch({
            type: HIDE_LOADING
        })

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'error',
            messages: error.response? error.response.data.error : ['Unknown Error Encountered']
        })

    }

}
