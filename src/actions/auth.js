import axios from 'axios';
import { types } from '#/actions'; 


const auth = {
    // LOGIN
    login() {
        return {
            type: types.AUTH_LOGIN,
        };
    },

    login_succ(username){
        return {
            type: types.AUTH_LOGIN_SUCC,
            username,
        };
    },

    login_fail(code){
        return {
            type: types.AUTH_LOGIN_FAIL,
            code,
        };
    },

    requestLogin(username, userpw) {
        return (dispatch) => {
            dispatch(this.login());
            return axios.post('api/auth/login', {username, userpw})
                .then(res => {
                    dispatch(this.login_succ(username));
                }).catch(err => {
                    dispatch(this.login_fail(err.response.data.code));
                });
        };
    },

    // LOGOUT
    logout(){
        return {
            type: types.AUTH_LOGOUT,
        };
    },
    logout_succ(){
        return {
            type: types.AUTH_LOGOUT_SUCC,
        };
    },

    logout_fail(code){
        return {
            type: types.AUTH_LOGOUT_FAIL,
            code,
        };
    },

    requestLogout() {
        return (dispatch) => {
            dispatch(this.logout());
            return axios.get('api/auth/logout')
                .then(res => {
                    dispatch(this.logout_succ());
                }).catch(err => {
                    // response?
                    if(err.response) dispatch(this.logout_fail(err.response.data.code));
                });
        };
    },

    // REGISTER
    register() {
        return {
            type: types.AUTH_REGISTER,
        };
    },

    register_succ() {
        return {
            type: types.AUTH_REGISTER_SUCC,
        };
    },

    register_fail(code) {
        return {
            type: types.AUTH_REGISTER_FAIL,
            code,
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
            type: types.AUTH_GET_STATUS,
        };
    },

    get_status_succ(username) {
        return {
            type: types.AUTH_GET_STATUS_SUCC,
            username,
        };
    },

    get_status_fail(code) {
        return {
            type: types.AUTH_GET_STATUS_FAIL,
            code,
        };
    },

    requestGetStatus() {
        return (dispatch) => {
            dispatch(this.get_status());
            return axios.get('api/auth/status')
                .then(res => {
                    dispatch(this.get_status_succ(res.data.info.username));
                }).catch(err => {
                    dispatch(this.get_status_fail(err.response.data.code));
                });
        };
    }
}

export default auth;
