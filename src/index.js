// react
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

// redux
import reducers  from '#/reducers';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {App, Home, SignUp, SignIn} from '#/containers';

const rootElement = document.getElementById('root');
const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="home" component={Home}/>
                <Route path="signup" component={SignUp}/>
                <Route path="signin" component={SignIn}/>
            </Route>
        </Router>
    </Provider>,
    rootElement
);
