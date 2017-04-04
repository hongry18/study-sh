import React from 'react';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf';

// Router
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// import containers
import { App, Home } from './containers';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduces from 'reduces';
import thunk from 'redux-thunk';

const store = createStore( reduces, applyMiddleware(thunk) );

const el = document.getElementById('root');

ReactDOM.render(
    <Provider store={store} >
        <Router history={browserHistory} >
            <Route path='/' component={App} >
                <IndexRoute component={Home} />
            </Route>
        </Router>
    </Provider>, el
);
