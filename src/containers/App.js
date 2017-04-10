import React from 'react';

import {Header, Login} from '#/components';

class App extends React.Component{
    render() {
        return (
            <div className="App">
                <Header />
                <Login mode={true}/>
                {this.props.children}
            </div>
        );
    }
}

export default App;
