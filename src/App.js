import React from 'react';
import ReactDOM from 'react-dom';

import Header from '~/components/Header';
import Main from '~/containers/Main';

ReactDOM.render(
    <div id="App">
        <Header />
        <Main />
    </div>
    ,document.getElementById('root')
);
