import React from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';

import * as ui from 'semantic-ui-react';

import * as auth from '#/actions/auth';
import {log, error} from '#/debug';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            username: '',
            userpw: ''
        };
    }

    handleLogin() {
        this.props.requestLogin(this.state.username, this.state.userpw).then(()=>{
            switch(this.props.login.status) {
                case 'SUCC': {
                    let loginData = {
                        isLoggedIn: true,
                        username: this.state.username
                    };
                    //cookie
                    document.cookie = 'key=' + btoa(JSON.stringify(loginData)); 
                    log('login success');
                    browserHistory.push('/');

                    //let newState = {};
                    //newState['username'] = "";
                    //newState['userpw'] = "";
                    //this.setState(newState);

                    return true;
                }
                case 'FAIL': {
                    error('login failed');
                    return false;
                }
                default: {
                    return false;
                }
            }
        });
    }

    handleLogout(e) {
        this.props.requestLogout();
    }

    handleChange(e) {
        let new_state = {};
        new_state[e.target.name] = e.target.value;
        this.setState(new_state);
    }
    
    render() {
        return (
            <div>{
                this.props.status.isLoggedIn
                ?this.LogoutForm()
                :this.LoginForm()
            }</div>
        );
    }

    LoginForm()  { //isLoggedIn = false
        return (
            <ui.Segment>
                <ui.Input 
                    iconPosition="left"
                    placeholder="ID"
                    name="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange}>
                    <ui.Icon name='user'/>
                    <input />
                </ui.Input>
                <ui.Input 
                    iconPosition="left"
                    placeholder="Password"
                    name="userpw"
                    type="password"
                    value={this.state.userpw}
                    onChange={this.handleChange}>
                    <ui.Icon name='lock'/>
                    <input />
                </ui.Input>
                <ui.Button
                    onClick={this.handleLogin}>
                    Login
                </ui.Button>
                <Link to="/signup">SignUp</Link>
            </ui.Segment>
        );
    }

    LogoutForm() { //isLoggedIn true
        return (
            <ui.Segment>
                <p>{this.props.status.currentUser}님 안녕하세요.</p>
                <ui.Button onClick={this.handleLogout}> Logout </ui.Button>
            </ui.Segment>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        status: state.auth.status
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        requestLogin: (id,pw) => { 
            return dispatch(auth.requestLogin(id,pw));
        },
        requestLogout: ()=>{
            return dispatch(auth.requestLogout());
        }
    };
};

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;
