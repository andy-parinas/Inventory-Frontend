import axios from 'axios';

import { SHOW_MESSAGES, LOAD_PRODUCTS, HIDE_LOADING, SHOW_LOADING } from './actionTypes';
import {InventoryBackendAPI} from '../../AppSettings';


export const loadProducts = (pageNumber: number = 1, sort, callback) => async dispatch => {

    try {
        dispatch({
            type: SHOW_LOADING
        })

        let uri = `${InventoryBackendAPI}/products?pageNumber=${pageNumber}`;

        
        if(sort){
            if(sort.asc){
                uri = uri + `&orderBy=${sort.column}&direction=ASC`
            }else{
                uri = uri + `&orderBy=${sort.column}&direction=DESC`
            }           
        }

        const response = await axios.get(uri);

        dispatch({
            type: LOAD_PRODUCTS,
            products: response.data,
            pagination: JSON.parse(response.headers.pagination)
        })

        if(callback){
            callback();
        }

        dispatch({
            type: HIDE_LOADING
        })

    }catch(error){

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'error',
            messages: ['Error Loading Products']
        })

        dispatch({
            type: HIDE_LOADING
        })
    }


}