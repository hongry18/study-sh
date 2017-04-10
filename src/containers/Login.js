import React from 'react';
import { Authentication } from 'components';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';
import { browserHistory } from 'react-router';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(id, pw) {
        return this.props.loginRequest(id, pw)
            .then( () => {
                if ( this.props.status === 'SUCCESS' ) {
                    let loginData = {
                        isLoggedIn: true,
                        username: id
                    }
    
                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
    
                    Materialize.toast( 'Welcome, ' + id + '!', 2000 );
                    browserHistory.push('/');
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
                    Materialize.toast( $toastContent, 2000 );
                    return false;
                }
            });
    }

    render() {
        return (
            <div>
                <Authentication
                    mode={true}
                    onLogin={this.handleLogin}
                    />
            </div>
        );
    }
}

const mapState2Props = (state) => {
    return {
        status: state.authentication.login.status
    };
};

const mapDispatch2Props = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id, pw));
        }
    };
}

export default connect(mapState2Props, mapDispatch2Props)(Login);
