import axios from 'axios';
import { 
    AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE,
    AUTH_REGISTER, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILURE,
    AUTH_GET_STATUS, AUTH_GET_STATUS_SUCCESS, AUTH_GET_STATUS_FAILURE, AUTH_LOGOUT
} from './ActionTypes'

/* Login */
export function loginRequest(username, password) {
    return (dispatch) => {
        dispatch(login());

        return axios.post('/api/account/signin', {username: username, password: password})
            .then((res) => {
                dispatch(loginSuccess(username));
            })
            .catch((err) => {
                dispatch(loginFailure());
            });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

/* Register */
export function registerRequest(username, password, nickname, email) {
    return (dispatch) => {
        dispatch(register());

        return axios.post('/api/account/signup', {username: username, password:password, nickname: nickname, email: email})
            .then( (res) => {
                dispatch(registerSuccess());
            })
            .catch( (err) => {
                dispatch(registerFailure(err.response.data));
            });
    };
}

export function register() {
    return {
        type: AUTH_REGISTER
    }
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS
    }
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    }
}

/* login session check */
/* GET STATUS */
export function getStatusRequest() {
    return (dispatch) => {
        // inform Get Status API is starting
        dispatch(getStatus());
 
        return axios.get('/api/account/')
        .then((response) => {
            dispatch(getStatusSuccess(response.data.info));
        }).catch((error) => {
            dispatch(getStatusFailure());
        });
    };
}
 
export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}
 
export function getStatusSuccess(userInfo) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        userInfo
    };
}
 
export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}

/* Logout */
export function logoutRequest() {
    return (dispatch) => {
        return axios.post('/api/account/logout')
        .then((response) => {
            dispatch(logout());
        });
    };
}
 
export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}
