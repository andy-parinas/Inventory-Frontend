import {SHOW_MESSAGES, HIDE_MESSAGES} from '../actions/actionTypes';

const initialState = {
    type: 'hidden',
    messages: []
}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case SHOW_MESSAGES:
            return {
                ...state,
                type: action.messageType,
                messages: action.messages
            }

        case HIDE_MESSAGES:
            return {
                ...state,
                type: 'hidden',
                messages: []
            }

        default:
            return state;

    }



}