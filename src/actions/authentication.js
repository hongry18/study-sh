import axios from 'axios';
import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCC,
    AUTH_LOGIN_FAIL
} from '#/actions/ActionTypes';

export function login(){
    return {
        type: AUTH_LOGIN
    };
}
export function login_succ(username){
    return {
        type: AUTH_LOGIN_SUCC,
        username
    };
}
export function login_fail(username){
    return {
        type: AUTH_LOGIN_FAIL
    };
}

// thunk
export function requestLogin(username, userpw) {
    return (dispatch) => {
        dispatch(login());
        // api request
        return axios.post('http://localhost:8080/api/users/', {username, userpw})
            .then(response => {
                dispatch(login_succ(username));
            }).catch(err => {
                dispatch(login_fail());
            });
    };
}
