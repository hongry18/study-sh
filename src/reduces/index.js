import authentication from './authentication';
import post from './post';

import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    post
});
