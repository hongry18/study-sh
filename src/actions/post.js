import {
    POST, POST_SUCCESS, POST_FAILURE,
    POST_LIST, POST_LIST_SUCCESS, POST_LIST_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* POST */
export function postRequest(title, content) {
    return (dispatch) => {
        dispatch(post());

        return axios.post('/api/post', {title, content})
            .then((res) => {
                dispatch(postSuccess());
            })
            .catch( (err) => {
                dispatch(postFailure(err.response.data.error));
            });
    };
}

export function post() {
    return {
        type: POST
    };
}

export function postSuccess() {
    return {
        type: POST_SUCCESS
    };
}

export function postFailure(error) {
    return {
        type: POST_FAILURE,
        error
    };
}

/* Post List */
export function postListRequest(isInitial, listType, id, username) {
    return (dispatch) => {
        dispatch(postList());

        let url = '/api/post';

        return axios.get(url)
            .then( (res) => {
                dispatch(postListSuccess(res.data, isInitial, listType));
            })
            .catch( (err) => {
                dispatch(postListFailure());
            });
    }
}

export function postList() {
    return {
        type: POST_LIST
    };
}

export function postListSuccess(data, isInitial, listType) {
    return {
        type: POST_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function postListFailure() {
    return {
        type: POST_LIST_FAILURE
    };
}
