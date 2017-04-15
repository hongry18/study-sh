import React from 'react';
import {connect} from 'react-redux';

import {Header} from '#/components';
import {requestGetStatus} from '#/actions/auth';

class App extends React.Component{
    componentDidMount() {
        function getCookie(name){
            let value = '; ' + document.cookie;
            let parts = value.split('; ' + name + '=');
            if (parts.length == 2)
                return parts.pop().split(';').shift();
        }

        let loginData = getCookie('key');

        if(typeof loginData === 'undefined') return;
        loginData = JSON.parse(atob(loginData));
        console.log('cookie:', loginData);

        // check login
        console.log('check login:',loginData.isLoggedIn);
        if(!loginData.isLoggedIn) return;

        this.props.requestGetStatus().then(() => {
            if(!this.props.status.valid) {
                loginData = {
                    isLoggedIn: false,
                    username: ''
                };
                document.cookie='key=' + btoa(JSON.stringify(loginData));
                console.log('session has expired');
            } 
        });
    }

    render() {
        let re = /(signin|signup)/;
        let isAuth = re.test(this.props.location.pathname);

        return (
            <div>
                {isAuth ? <div>auth</div> : <Header isLoggedIn={this.props.status.isLoggedIn}/>}
                {this.props.children}
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        status: state.auth.status
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        requestGetStatus: ()=>{
            return dispatch(requestGetStatus());
        }
    };
};

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
