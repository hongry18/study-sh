import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { auth } from '#/actions';
import * as ui from 'semantic-ui-react';


class Login extends Component {
    constructor(props) {
        super(props);
        //bindings
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
                    document.cookie = 'key=' + btoa(JSON.stringify(loginData)); 
                    this.setState({
                        username: '',
                        userpw: ''
                    });
                    browserHistory.push('/');
                    return true;
                }
                case 'FAIL': {
                    return false;
                }
                default: {
                    return false;
                }
            }
        });
    }

    handleLogout(e) {
        this.props.requestLogout().then(() => {
            let loginData = {
                isLoggedIn: false,
                username: ''
            };
            document.cookie = 'key=' + btoa(JSON.stringify(loginData));
        });
    }

    handleChange(e) {
        let new_state = {};
        new_state[e.target.name] = e.target.value;
        this.setState(new_state);
    }

    handleSignUp() {
        browserHistory.push('/signup');
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
            <div>
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
                <ui.Button onClick={this.handleLogin}>Login</ui.Button>
                <ui.Button onClick={this.handleSignUp}>SignUp</ui.Button>
            </div>
        );
    }

    LogoutForm() { //isLoggedIn true
        return (
            <div>
                <ui.Icon name='user' /> {this.props.status.currentUser}
                <ui.Button onClick={this.handleLogout}>Logout</ui.Button>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
