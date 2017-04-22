import axios from 'axios';
import { types } from '#/actions';


const memo = {
    post() {
        return {
            type: types.MEMO_POST
        };
    },

    post_succ() {
        return {
            type: types.MEMO_POST_SUCC
        };
    },

    post_fail(error) {
        return {
            type: types.MEMO_POST_FAIL,
            error
        };
    },

    requestPost(title, content) {
        return (dispatch) => {
            dispatch(this.post());
            return axios.post('api/memo', {title, content})
                .then(res => {
                    dispatch(this.post_succ(res.data));
                }).catch(err => {
                    dispatch(this.post_fail(err.response.data.code));
                });
        };
    },

    // GET
    get() {
        return {
            type: types.MEMO_GET
        };
    },

    get_succ(data) {
        return {
            type: types.MEMO_GET_SUCC,
            data
        };
    },

    get_fail(error) {
        return {
            type: types.MEMO_GET_FAIL,
            error
        };
    },

    requestGet() {
        return (dispatch) => {
            dispatch(this.get());
            return axios.get('api/memo/')
                .then(res => {
                    dispatch(this.get_succ(res.data));
                }).catch(error => {
                    dispatch(this.get_fail(error.response.data.code));
                });
        };
    },
}

export default memo;
