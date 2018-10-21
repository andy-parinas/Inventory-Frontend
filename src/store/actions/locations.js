import axios from 'axios';

import {LOAD_LOCATIONS, LOAD_LOCATION, LOAD_LOCATION_TYPES, SHOW_LOADING} from './actionTypes';
import {InventoryBackendAPI} from '../../AppSettings';

export const loadLocations = (pageNumber: number = 1, sort, filter, callback) => async dispatch => {

    try {

        dispatch({
            type: SHOW_LOADING
        })

        let uri = `${InventoryBackendAPI}/locations?pageNumber=${pageNumber}`;

        if(sort){
            if(sort.asc){
                uri = uri + `&orderBy=${sort.column}&direction=ASC`
            }else{
                uri = uri + `&orderBy=${sort.column}&direction=DESC`
            }
        }
       

        // console.log(uri);

        const response = await axios.get(uri);

        // console.log(response.data);

        dispatch({
            type: LOAD_LOCATIONS,
            locations: response.data,
            pagination: JSON.parse(response.headers.pagination),
        })

        if(callback) callback();

    }catch(error){
        console.log(error);

    }


}


export const loadLocation = (id) => async dispatch => {

    try{

        const uri = `${InventoryBackendAPI}/locations/${id}`;
        const response = await axios.get(uri);

        dispatch({
            type: LOAD_LOCATION,
            location: response.data
        })

    }catch(error){

        console.log(error);

    }

}

export const loadLocationTypes = () => async dispatch => {

    try {
        const uri = `${InventoryBackendAPI}/locations/types`;
        const response = await axios.get(uri);

        dispatch({
            type: LOAD_LOCATION_TYPES,
            locationTypes: response.data
        })


    }catch(error){

        console.log(error);

    }
}