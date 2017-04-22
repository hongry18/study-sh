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
    }
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
        case types.MEMO_GET_SUCC:
            return update(state, {
                get: {
                    status: {$set: 'SUCC'},
                    data: {$set: action.data},
                    isLast: {$set: action.data.length < 6}
                }
            });
        case types.MEMO_GET_FAIL:
            return update(state, {
                get: {
                    status: {$set: 'FAIL'},
                    error: {$set: action.error}
                }
            });

        // OTHERS
        default:
            return state;
    }
}
