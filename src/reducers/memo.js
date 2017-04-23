import update from 'react-addons-update';
import { types } from '#/actions';

const initState = {
    post: {
        status: 'INIT',
        error: -1
    },
    get: {
        status: 'INIT',
        error: -1,
        isLast: false,
        data: []
    },
    put: {
        status: 'INIT',
        error: -1,
    },
    delete: {
        status: 'INIT',
        error: -1,
    },
};

export default function memo(state, action) {
    if(typeof state === 'undefined'){
        state = initState;
    }
    switch(action.type){
        // POST
        case types.MEMO_POST:
            return update(state, {
                post: {
                    status: {$set: 'WAIT'},
                    error: {$set: -1}
                }
            });
        case types.MEMO_POST_SUCC:
            return update(state, {
                post: {
                    status: {$set: 'SUCC'}
                }
            });
        case types.MEMO_POST_FAIL:
            return update(state, {
                post: {
                    status: {$set: 'FAIL'},
                    error: {$set: action.error}
                }
            });

        // GET
        case types.MEMO_GET:
            return update(state, {
                get: {
                    status: {$set: 'WAIT'}
                }
            });
        case types.MEMO_GET_SUCC: {
            if (action.isInitial){ 
                return update(state, {
                    get: {
                        status: {$set: 'SUCC'},
                        data: {$set: action.data},
                        isLast: {$set: action.data.length < 6}
                    }
                });
            } else if (action.listStyle == 'old'){
                // handling older posts
                return update(state, {
                    get: {
                        status: {$set: 'SUCC'},
                        data: {$push: action.data},
                        isLast: {$set: action.data.length < 6}
                    }
                });
            } else {
                // handling newer posts
                return update(state, {
                    get: {
                        status: {$set: 'SUCC'},
                        data: {$unshift: action.data}
                    }
                });
            }
        }
        case types.MEMO_GET_FAIL:
            return update(state, {
                get: {
                    status: {$set: 'FAIL'},
                    error: {$set: action.error}
                }
            });

        // PUT
        case types.MEMO_PUT:
            return update(state, {
                put: {
                    status: {$set: 'WAIT'}
                }
            });
        case types.MEMO_PUT_SUCC:
            return update(state, {
                put: {
                    status: {$set: 'SUCC'}
                },
                get: {
                    data: {
                        [action.index]: {$set: action.savedData}
                    }
                }
            });
        case types.MEMO_PUT_FAIL:
            return update(state, {
                put: {
                    status: {$set: 'FAIL'},
                    error: {$set: action.error}
                }
            });

        // DELETE
        case types.MEMO_DELETE:
            return update(state, {
                delete: {
                    status: {$set: 'WAIT'}
                }
            });
        case types.MEMO_DELETE_SUCC:
            return update(state, {
                delete: {
                    status: {$set: 'SUCC'}
                }
            });
        case types.MEMO_DELETE_FAIL:
            return update(state, {
                delete: {
                    status: {$set: 'FAIL'},
                    error: {$set: action.error}
                }
            });

        // OTHERS
        default:
            return state;
    }
}
