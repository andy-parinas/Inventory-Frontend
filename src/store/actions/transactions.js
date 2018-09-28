import axios from 'axios';

import {InventoryBackendAPI} from '../../AppSettings';
import { LOAD_TRANSACTIONS, SHOW_MESSAGES, LOAD_TRANSACTION } from './actionTypes';


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
