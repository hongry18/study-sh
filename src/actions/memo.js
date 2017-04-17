import axios from 'axios';
import * as types from '#/actions/ActionTypes';

export function memo_post() {
    return {
        type: types.MEMO_POST
    };
}

export function memo_post_succ() {
    return {
        type: types.MEMO_POST_SUCC
    };
}

export function memo_post_fail(error) {
    return {
        type: types.MEMO_POST_FAIL,
        error
    };
}

export function requestMemoPost(title, content) {
    return (dispatch) => {
        dispatch(memo_post());
        return axios.post('api/memo', {title, content})
            .then(res => {
                dispatch(memo_post_succ(res.data));
            }).catch(err => {
                dispatch(memo_post_fail(err.response.data.code));
            });
    };
}

export function memo_get() {
    return {
        type: types.MEMO_GET
    };
}

export function memo_get_succ(data) {
    console.log('action creator_get_succ');
    return {
        type: types.MEMO_GET_SUCC,
        data
    };
}

export function memo_get_fail(error) {
    return {
        type: types.MEMO_GET_FAIL,
        error
    };
}

export function requestMemoGet() {
    return (dispatch) => {
        dispatch(memo_get());
        return axios.get('api/memo/')
            .then(res => {
                console.log('axios:', res.data); // can get data.. but  @todo
                dispatch(memo_get_succ(res.data));
            }).catch(error => {
                // get error code
                dispatch(memo_get_fail(error.response.data.code));
            });
    };
}
