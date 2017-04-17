import { combineReducers } from 'redux';

import auth from '#/reducers/auth';
import memo from '#/reducers/memo';

export default combineReducers({
    auth,
    memo
});
