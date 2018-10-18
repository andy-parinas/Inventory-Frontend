import axios from 'axios';

import {LOAD_LOCATIONS, LOAD_LOCATION} from './actionTypes';
import {InventoryBackendAPI} from '../../AppSettings';

export const loadLocations = () => async dispatch => {

    try {

        const uri = `${InventoryBackendAPI}/locations`;
        const response = await axios.get(uri);

        dispatch({
            type: LOAD_LOCATIONS,
            locations: response.data
        })

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