import axios from 'axios';

import {LOAD_LOCATIONS, LOAD_LOCATION, 
    LOAD_LOCATION_TYPES, SHOW_LOADING, CREATE_LOCATION, HIDE_LOADING, SHOW_MESSAGES, 
    CREATE_LOCATION_TYPE, UPDATE_LOCATION_TYPE, DELETE_LOCATION_TYPE, UPDATE_LOCATION, DELETE_LOCATION} from './actionTypes';
import {InventoryBackendAPI} from '../../AppSettings';

export const loadLocations = (pageNumber: number = 1, sort, filter, callback) => async dispatch => {

    try {

        dispatch({
            type: SHOW_LOADING
        })

        let uri = `${InventoryBackendAPI}/locations?pageNumber=${pageNumber}`;
        let filterParams = '';

        if(sort){
            if(sort.asc){
                uri = uri + `&orderBy=${sort.column}&direction=ASC`
            }else{
                uri = uri + `&orderBy=${sort.column}&direction=DESC`
            }
        }

        if(filter){
            for(const property in filter){
                const safeValue = encodeURIComponent(filter[property])
                filterParams = filterParams + `${property}=${safeValue}&`
            }
        }

        uri = uri + `&${filterParams}`;
       
        const response = await axios.get(uri);

        dispatch({
            type: LOAD_LOCATIONS,
            locations: response.data,
            pagination: JSON.parse(response.headers.pagination),
        })

        if(callback) callback();

          
        dispatch({
            type: HIDE_LOADING
        });

    }catch(error){
        
        if(error.response && error.response.data && error.response.data.error){
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  error.response.data.error
            })

        }else{
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  ['Error Loading Location']
            })

            console.log(error);
        }

        dispatch({
            type: HIDE_LOADING
        });

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



export const createLocation = (location, callback) => async dispatch => {

    try {


        const uri = `${InventoryBackendAPI}/locations`;

        const response = await axios.post(uri, location);

        
        dispatch({
            type: CREATE_LOCATION,
            location: response.data
        })

    if(callback) callback();

    }catch(error){

        console.log(error);

    }


}

export const updateLocation = (id, location, callback) => async dispatch => {
    try{

        const uri = `${InventoryBackendAPI}/locations/${id}`;

        const response = await axios.put(uri, location);

        
        dispatch({
            type: UPDATE_LOCATION,
            id: id,
            location: response.data
        })

        if(callback) callback();

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'success',
            messages:  ['Location Successfully Updated']
        })


    }catch(error) {

        if(error.response && error.response.data && error.response.data.error){
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  error.response.data.error
            })

        }else{
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  ['Error Updating Location']
            })

            console.log(error);
        }


    }
}

export const deleteLocation = (id, callback) => async dispatch => {

    try{

        const uri = `${InventoryBackendAPI}/locations/${id}`
        const response = await axios.delete(uri);


        dispatch({
            type: DELETE_LOCATION,
            id: id
        })

        if(callback) callback();

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'success',
            messages:  ['Location Successfully Deleted']
        })



    }catch(error){

        if(error.response && error.response.data && error.response.data.error){
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  error.response.data.error
            })

        }else{
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  ['Error Deleting Location']
            })

            console.log(error);
        }



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

export const createLocationType = (locationType, callback) => async dispatch => {

    try {

        console.log(locationType);

        const uri = `${InventoryBackendAPI}/locations/types`
        const response = await axios.post(uri, locationType);


        dispatch({
            type: CREATE_LOCATION_TYPE,
            locationType: response.data
        })

        if(callback) callback();

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'success',
            messages:  ['Location Type Successfully Created']
        })


    }catch(error){

        if(error.response && error.response.data && error.response.data.error){
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  error.response.data.error
            })

        }else{
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  ['Error Creating Location Type']
            })

            console.log(error);
        }

    }

}

export const updateLocationType = (id, locationType, callback) => async dispatch => {


    try {

        const uri = `${InventoryBackendAPI}/locations/types/${id}`
        const response = await axios.put(uri, locationType);


        dispatch({
            type: UPDATE_LOCATION_TYPE,
            id: id,
            locationType: response.data
        })

        if(callback) callback();

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'success',
            messages:  ['Location Type Successfully Updated']
        })


    }catch(error){

        if(error.response && error.response.data && error.response.data.error){
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  error.response.data.error
            })

        }else{
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  ['Error Updating Location Type']
            })

            console.log(error);
        }

    }

}

export const deleteLocationType = (id, callback) => async dispatch => {

    try {

        const uri = `${InventoryBackendAPI}/locations/types/${id}`
        const response = await axios.delete(uri);


        dispatch({
            type: DELETE_LOCATION_TYPE,
            id: id
        })

        if(callback) callback();

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'success',
            messages:  ['Location Type Successfully Deleted']
        })


    }catch(error){

        if(error.response && error.response.data && error.response.data.error){
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  error.response.data.error
            })

        }else{
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  ['Error Deleting Location Type']
            })

            console.log(error);
        }

    }

}