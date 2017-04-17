import * as types from '#/actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    login: {
        status: 'INIT'
    },
    register: {
        status: 'INIT'
    },
    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: ''
    }
};
export default function auth(state, action) {
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
                status: {
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
        case types.AUTH_LOGOUT:
            return update(state, {
                login: {
                    status: {$set: 'INIT'}
                },
                status: {
                    isLoggedIn: {$set: false},
                    currentUser: {$set: ''}
                }
            });
        case types.AUTH_REGISTER:
            return update(state, {
                register: {
                    status: {$set: 'WAIT'}
                }
            });
        case types.AUTH_REGISTER_SUCC:
            return update(state, {
                register: {
                    status: {$set: 'SUCC'}
                }
            });
        case types.AUTH_REGISTER_FAIL:
            return update(state, {
                register: {
                    status: {$set: 'FAIL'},
                    code: {$set: action.code}
                }
            });
        case types.AUTH_GET_STATUS:
            return update(state, {
                status: {
                    isLoggedIn: {$set: true}
                }
            });
        case types.AUTH_GET_STATUS_SUCC:
            return update(state, {
                status: {
                    valid: {$set: true},
                    isLoggedIn: {$set: true},
                    currentUser: {$set: action.username}
                }
            });
        case types.AUTH_GET_STATUS_FAIL:
            return update(state, {
                status: {
                    valid: {$set: false},
                    isLoggedIn: {$set: false}
                }
            });
        default:
            return state;
    }
    return state;
};
