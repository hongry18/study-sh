import axios from 'axios';
import { types } from '#/actions';


const memo = {
    // POST
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

    get_succ(data, isInitial, listStyle) {
        return {
            type: types.MEMO_GET_SUCC,
            isInitial,
            listStyle,
            data
        };
    },

    get_fail(error) {
        return {
            type: types.MEMO_GET_FAIL,
            error
        };
    },

    requestGet(isInitial, listStyle, memoId) {
        let url = 'api/memo';
        if (!isInitial) {
            url += `/${listStyle}/${memoId}`;
        }
        return (dispatch) => {
            dispatch(this.get());
            return axios.get(url)
                .then(res => {
                    dispatch(this.get_succ(res.data, isInitial, listStyle));
                }).catch(error => {
                    if(error.response) dispatch(this.get_fail(error.response.data.code));
                });
        };
    },

    // MODIFY
    put() {
        return {
            type: types.MEMO_PUT
        };
    },

    put_succ(index, savedData) {
        return {
            type: types.MEMO_PUT_SUCC,
            index,
            savedData,
        };
    },

    put_fail() {
        return {
            type: types.MEMO_PUT_FAIL
        };
    },

    requestPut(index, id, data) {
        return (dispatch) => {
            dispatch(this.put());
            return axios.put('api/memo/'+id, data)
                .then(res => {
                    dispatch(this.put_succ(index, res.data));
                }).catch(err => {
                    if(err){
                        dispatch(this.put_fail(err.response.data.code));
                    }
                });

        };
    },

    // DELETE
    delete() {
        return {
            type: types.MEMO_DELETE
        };
    },

    delete_succ() {
        return {
            type: types.MEMO_DELETE_SUCC
        };
    },

    delete_fail() {
        return {
            type: types.MEMO_DELETE_FAIL
        };
    },

    requestDelete(id) {
        return (dispatch) => {
            dispatch(this.delete());
            return axios.delete('api/memo/'+id)
                .then(res => {
                    dispatch(this.delete_succ());
                }).catch(err => {
                    dispatch(this.delete_fail(err.response.code));
                });
        };
    },
}

export default memo;
