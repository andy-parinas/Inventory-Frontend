import { LOGIN_USER, LOGOUT_USER } from '../actions/actionTypes';

const initialState = {
    authenticated: false,
    token: null,
    userName: ''
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                authenticated: true,
                token: action.token,
                userName: action.userName
            }

        case LOGOUT_USER:
            return {
                ...state,
                authenticated: false,
                token: null,
                userName: ''
            }
        default:
            return state;
    }


}

export default reducer;