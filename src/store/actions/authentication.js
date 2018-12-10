import axios from 'axios';

import {InventoryBackendAPI} from '../../AppSettings';
import { LOGIN_USER, LOGOUT_USER, SHOW_MESSAGES } from './actionTypes';


export const login = (userLogin, callback) => async dispatch => {

    try {
        
        const uri = `${InventoryBackendAPI}/auth/login`;
        const response = await axios.post(uri, userLogin);


        const user = response.data.user;
        const token = response.data.token;

        localStorage.setItem('token', token);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userId', user.id);

        dispatch({
            type: LOGIN_USER,
            userName: user.name,
            token: token,
        })

        if(callback) callback();



    }catch(error) {

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'error',
            messages: ['Login Failed.']
        })
    }



}

export const logout = (callback) =>  dispatch => {

    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');


    dispatch({
        type: LOGOUT_USER,
    })

    // if(callback) callback();

}