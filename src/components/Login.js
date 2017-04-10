import React from 'react';
import {connect} from 'react-redux';

import {requestLogin} from '#/actions/authentication';

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
            if(this.state.status == 'SUCC') {
                let loginData = {
                    isLoggedIn: true,
                    username
                };
                //cookie
                document.cookie = 'key=' + btoa(JSON.stringify(loginData)); ////
                console.log('login succes!');
                return true;
            }
            else if(this.state.status == 'FAIL') {
                console.log('login failed');
                return false;
            }
        });
    }

    handleLogout(e) {
        //this.props.onLogout();
    }

    handleChange(e) {
        let new_state = {};
        new_state[e.target.name] = e.target.value;
        this.setState(new_state);
    }
    
    render() {
        return (
            <div>{
                this.state.isLoggedIn
                ?this.LogoutForm()
                :this.LoginForm()
            }</div>
        );
    }

    //isLoggedIn = false
    LoginForm()  {
        return (
            <div className="Login">
                <input className="username"
                    name="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange} />
                <input className="userpw"
                    name="userpw"
                    type="text"
                    value={this.state.userpw}
                    onChange={this.handleChange} />
                <button onClick={this.handleLogin}>
                    Login
                </button>
            </div>
        );
    }

    //isLoggedIn true
    LogoutForm() {
        return (
            <div className="Logout">
                <p>{this.state.username}님 안녕하세요.</p>
                <button onClick={this.handleLogout}> Logout </button>
            </div>
        );
    }


}

let mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status,
        isLoggedIn: state.authentication.status.isLoggedIn,
        username: state.authentication.status.currentUser
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        requestLogin: (id,pw) => { 
            return dispatch(requestLogin(id,pw));
        }
    };
};

Login = connect(mapStateToProps, mapDispatchToProps)(Login);


export default Login;
