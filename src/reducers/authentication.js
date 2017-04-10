import * as types from '#/actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    login: {
        status: 'INIT'
    },
    status: {
        isLoggedIn: false,
        currentUser: '',
    }
};

export default function authentication(state, action) {
    if(typeof state == 'undefined') {
        state = initialState;
    }
    switch(action.type) {
        case types.AUTH_LOGIN:
            return update(state, {
                login: {
                    status: {$set: 'WAIT'}
                }
            });
        case types.AUTH_LOGIN_SUCC:
            return update(state, {
                login: {
                    status: {$set: 'SUCC'},
                },
                state: {
                    isLoggedIn: {$set: true},
                    currentUser: {$set: action.username}
                }
            });
        case types.AUTH_LOGIN_FAIL:
            return update(state, {
                login: {
                    status: {$set: 'FAIL'}
                }
            });
        default:
            return state;
    }
    return state;
};
