import React, { Component } from 'react';
import { Header } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'actions/authentication';

class App extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        // get loginData form cookie
        var loginData = getCookie('key');

        // if loginData is undefined, do nothing
        if ( typeof loginData === 'undefined' ) return;

        // decode base64 & parse json
        loginData = JSON.parse( atob(loginData) );

        // if not logged in, do nothing
        if ( !loginData.isLoggedIn ) return;

        this.props.getStatusRequest()
            .then(() => {
                // if session not valid
                if ( !this.props.status.valid ) {
                    loginData = {
                        isLoggedIn: false,
                        username: ''
                    }

                    document.cookie='key=' + btoa(JSON.stringify(loginData));
 
                    // and notify
                    let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                    Materialize.toast($toastContent, 4000);
                }
            });
    }

    handleLogout() {
        this.props.logoutRequest()
            .then(() => {
                Materialize.toast('Bye ~!', 2000);
                // EMPTIES THE SESSION
                let loginData = {
                    isLoggedIn: false,
                    username: ''
                };
 
                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
            });
    }

    render() {
        /* Check whether current route is login or register using regex */
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);

        const header = (
            <Header
                isLoggedIn={this.props.status.isLoggedIn}
                onLogout={this.handleLogout}
            />
        );

        return (
            <div>
                { isAuth ? undefined : header }
                { this.props.children }
            </div>
        );
    }
}

const mapState2Props = (state) => {
    return {
        status: state.authentication.status
    };
};
 
const mapDispatch2Props = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    };
};
 
export default connect(mapState2Props, mapDispatch2Props)(App);
