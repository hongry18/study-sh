import update from 'react-addons-update';
import { types } from '#/actions';


const initState = {
    login: {
        status: 'INIT',
        code: -1,
    },
    register: {
        status: 'INIT',
        code: -1,
    },
    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: ''
    }
};

export default function auth(state, action) {
    if(typeof state == 'undefined') {
        state = initState;
    }
    switch(action.type) {

        // LOGIN, LOGOUT
        case types.AUTH_LOGIN:
            return update(state, {
                login: {
                    status: {$set: 'WAIT'},
                }
            });
        case types.AUTH_LOGIN_SUCC:
            return update(state, {
                login: {
                    status: {$set: 'SUCC'},
                    code: {$set: 0},
                },
                status: {
                    isLoggedIn: {$set: true},
                    currentUser: {$set: action.username},
                }
            });
        case types.AUTH_LOGIN_FAIL:
            return update(state, {
                login: {
                    status: {$set: 'FAIL'},
                    code: {$set: action.code},
                }
            });
        case types.AUTH_LOGOUT:
            return update(state, {
                login: {
                    status: {$set: 'INIT'},
                    code: {$set: 0},
                },
                status: {
                    isLoggedIn: {$set: false},
                    currentUser: {$set: ''},
                }
            });

        // REGISTER
        case types.AUTH_REGISTER:
            return update(state, {
                register: {
                    status: {$set: 'WAIT'},
                }
            });
        case types.AUTH_REGISTER_SUCC:
            return update(state, {
                register: {
                    status: {$set: 'SUCC'},
                    code: {$set: 0},
                }
            });
        case types.AUTH_REGISTER_FAIL:
            return update(state, {
                register: {
                    status: {$set: 'FAIL'},
                    code: {$set: action.code}
                }
            });

        // GET STATUS
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

        // OTHERS
        default:
            return state;
    }
    return state;
};
