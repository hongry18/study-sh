import axios from 'axios';
import { types } from '#/actions'; 


const auth = {
    // LOGIN
    login() {
        return {
            type: types.AUTH_LOGIN
        };
    },

    login_succ(username){
        return {
            type: types.AUTH_LOGIN_SUCC,
            username
        };
    },

    login_fail(){
        return {
            type: types.AUTH_LOGIN_FAIL
        };
    },

    requestLogin(username, userpw) {
        return (dispatch) => {
            dispatch(this.login());
            // api request
            return axios.post('api/auth/login', {username, userpw})
                .then(response => {
                    dispatch(this.login_succ(username));
                }).catch(err => {
                    dispatch(this.login_fail());
                });
        };
    },

    // LOGOUT
    logout(){
        return {
            type: types.AUTH_LOGOUT
        };
    },

    requestLogout() {
        return (dispatch) => {
            return axios.get('api/auth/logout')
                .then(res => {
                    if(res.data.success) {
                        dispatch(this.logout());
                    }
                }).catch(err => {
                    //@todo err handling
                });
        };
    },

    // REGISTER
    register() {
        return {
            type: types.AUTH_REGISTER
        };
    },

    register_succ() {
        return {
            type: types.AUTH_REGISTER_SUCC
        };
    },

    register_fail(code) {
        return {
            type: types.AUTH_REGISTER_FAIL,
            code
        };
    },

    requestRegister(username, userpw, email) {
        return (dispatch) => {
            dispatch(this.register());
            return axios.post('/api/auth/signup', {username, userpw, email})
                .then((res) =>{
                    dispatch(this.register_succ());               
                }).catch((err)=>{
                    dispatch(this.register_fail(err.response.data.code));               
                });
        };
    },

    // GET STATUS
    get_status() {
        return {
            type: types.AUTH_GET_STATUS
        };
    },

    get_status_succ(username) {
        return {
            type: types.AUTH_GET_STATUS_SUCC,
            username
        };
    },

    get_status_fail() {
        return {
            type: types.AUTH_GET_STATUS_FAIL
        };
    },

    requestGetStatus() {
        return (dispatch) => {
            dispatch(this.get_status());
            return axios.get('api/auth/status')
                .then(res => {
                    dispatch(this.get_status_succ(res.data.info.username));
                }).catch(err => {
                    dispatch(this.get_status_fail());
                });
        };
    },
}

export default auth;
