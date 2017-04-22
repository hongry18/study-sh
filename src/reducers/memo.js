import * as types from '#/actions/ActionTypes';

import update from 'react-addons-update';

const initialState = {
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
        state = initialState;
    }

    switch(action.type){
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
        case types.MEMO_GET:
            console.log('action.reducer.memo-memoget');
            return update(state, {
                get: {
                    status: {$set: 'WAIT'}
                }
            });
        case types.MEMO_GET_SUCC:
            console.log('action.reducer.memo-memogetsucc');
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
        default:
            return state;
    }
}
