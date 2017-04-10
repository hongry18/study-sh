import React from 'react';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf';

// Router
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// import containers
import { App, Home, Login, Register, NewPost } from './containers';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduces from 'reduces';
import thunk from 'redux-thunk';

const store = createStore( reduces, applyMiddleware(thunk) );

const el = document.getElementById('root');

Perf.start();

ReactDOM.render(
    <Provider store={store} >
        <Router history={browserHistory} >
            <Route path='/' component={App} >
                <IndexRoute component={Home} />
                <Route path='login' component={Login} />
                <Route path='register' component={Register} />
                <Route path='newPost' component={NewPost} />
            </Route>
        </Router>
    </Provider>, el
);

Perf.stop();
const measurements = Perf.getLastMeasurements();
Perf.printInclusive(measurements);
Perf.printExclusive(measurements);
Perf.printWasted(measurements);
