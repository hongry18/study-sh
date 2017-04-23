import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '#/actions';
import { 
    Header,
} from '#/components';


class App extends Component{
    render() {
        let isSignUp = /(signup)/.test(this.props.location.pathname);
        return (
            <div>
                {isSignUp
                        ? undefined
                        : <Header isLoggedIn={this.props.status.isLoggedIn}/>
                }
                {this.props.children}
            </div>
        );
    }

    componentDidMount() {
        function getCookie(name){
            let value = '; ' + document.cookie;
            let parts = value.split('; ' + name + '=');
            if (parts.length == 2) return parts.pop().split(';').shift();
        }
        let loginData = getCookie('key');
        if (typeof loginData === 'undefined') return;
        loginData = JSON.parse(atob(loginData));
        // check login
        if (!loginData.isLoggedIn) return;
        this.props.requestGetStatus()
            .then(() => { // err????
                // if session expired
                if (!this.props.status.valid) {
                    loginData = {
                        isLoggedIn: false,
                        username: ''
                    };
                    document.cookie='key=' + btoa(JSON.stringify(loginData));
                } 
            });
    }
}

let mapStateToProps = (state) => {
    return {
        status: state.auth.status
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        requestGetStatus: ()=> {
            return dispatch(auth.requestGetStatus());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
