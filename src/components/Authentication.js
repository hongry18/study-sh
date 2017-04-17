import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class Authentication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            nickname: '',
            email: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogin() {
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onLogin(id, pw)
            .then((success) => {
                if (!success) {
                    this.setState({password: ''});
                }
            });
    }

    handleRegister() {
        let id = this.state.username;
        let pw = this.state.password;
        let nick = this.state.nickname;
        let email = this.state.email;

        this.props.onRegister(id, pw, nick, email)
            .then((result) => {
                if (!result) {
                    this.setState({
                        username: '',
                        password: '',
                        nickname: '',
                        email: ''
                    });
                }
            });
    }

    handleKeyPress(e) {
        if ( e.charCode === 13 ) {
            if (this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }

    render() {

        const inputBoxes = (
            <div>
                <div className="input-field col s12 username">
                    <label>Username</label>
                    <input
                    name="username"
                    type="text"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.username}
                    />
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                    name="password"
                    type="password"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.password}
                    onKeyPress={this.props.mode ? this.handleKeyPress : ''}
                    />
                </div>
            </div>
        );

        const loginView = (
            <div>
                <div className="card-content">
                    <div className="row">
                        {inputBoxes}
                        <a className="waves-effect waves-light btn" onClick={this.handleLogin}>SUBMIT</a>
                    </div>
                </div>
 
 
                <div className="footer">
                    <div className="card-content">
                        <div className="right" >
                        New Here? <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>
 
            </div>
        );
 
        const registerView = (
            <div className="card-content">
                <div className="row">
                    {inputBoxes}
                    <div className="input-field col s12">
                        <label>nickname</label>
                        <input
                        name="nickname"
                        type="text"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.nickname}
                        />
                    </div>
                    <div className="input-field col s12">
                        <label>email</label>
                        <input
                        name="email"
                        type="text"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.email}
                        onKeyPress={this.handleKeyPress}
                        />
                    </div>
                    <a className="waves-effect waves-light btn" onClick={this.handleRegister}>CREATE</a>
                </div>

                <div className="footer">
                    <div className="card-content">
                        <div className="right" >
                        Cancel? <Link to="/login">go to Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    
        return (
            <div className="container auth">
                <Link className="logo" to="/">Blog</Link>
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
                    </div>
                    {this.props.mode ? loginView : registerView }
                </div>
            </div>
        );
    }
}

Authentication.propTypes = {
    mode: PropTypes.bool,
    onLogin: PropTypes.func,
    onRegister: PropTypes.func
};
 
Authentication.defaultProps = {
    mode: true,
    onLogin: (id, pw) => { console.error("login function not defined"); },
    onRegister: (id, pw) => { console.error("register function not defined"); }
};

export default Authentication;
