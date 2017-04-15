import axios from 'axios';
import * as types from '#/actions/ActionTypes'; 

// Login //
export function login(){
    return {
        type: types.AUTH_LOGIN
    };
}

export function login_succ(username){
    return {
        type: types.AUTH_LOGIN_SUCC,
        username
    };
}

export function login_fail(){
    return {
        type: types.AUTH_LOGIN_FAIL
    };
}

export function requestLogin(username, userpw) {
    return (dispatch) => {
        dispatch(login());
        // api request
        return axios.post('api/auth/login', {username, userpw})
            .then(response => {
                dispatch(login_succ(username));
            }).catch(err => {
                dispatch(login_fail());
            });
    };
}

// Logout //
export function logout(){
    return {
        type: types.AUTH_LOGOUT
    };
}

export function requestLogout() {
    return (dispatch) => {
        return axios.get('api/auth/logout')
            .then(res => {
                if(res.data.success) {
                    dispatch(logout());
                }
            }).catch(err => {
                console.error('logout failed');
            });
    };
}

// Register //
export function register() {
    return {
        type: types.AUTH_REGISTER
    };
}

export function register_succ() {
    return {
        type: types.AUTH_REGISTER_SUCC
    };
}

export function register_fail(code) {
    return {
        type: types.AUTH_REGISTER_FAIL,
        code
    };
}

export function requestRegister(username, userpw, email) {
    return (dispatch) => {
        dispatch(register());
        return axios.post('/api/auth/signup', {username, userpw, email})
            .then((res) =>{
                dispatch(register_succ());               
            }).catch((err)=>{
                dispatch(register_fail(err.response.data.code));               
            });
    };
}

// check status //
export function get_status() {
    return {
        type: types.AUTH_GET_STATUS
    };
}

export function get_status_succ(username) {
    return {
        type: types.AUTH_GET_STATUS_SUCC,
        username
    };
}

export function get_status_fail() {
    return {
        type: types.AUTH_GET_STATUS_FAIL
    };
}

export function requestGetStatus() {
    return (dispatch) => {
        dispatch(get_status());
        return axios.get('api/auth/status')
            .then(res => {
                dispatch(get_status_succ(res.data.info.username));
            }).catch(err => {
                dispatch(get_status_fail());
            });
    };
}
