import { SHOW_MESSAGES, HIDE_MESSAGES } from './actionTypes';

export const showMessages = (messageType: string, messages: string[]) => {

    return {
        type: SHOW_MESSAGES,
        messageType: messageType,
        messages: messages
    }
}

export const hideMessages = () => {

    return {
        type: HIDE_MESSAGES,
    }
}