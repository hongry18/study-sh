import React from 'react';

const elemLogin = (
    <div id="Login">
        <Input id="username"
            onChange={this.props.handleChange.bind(this)}
        />
        <Input id="userpw"
            onChange={this.props.handleChange.bind(this)}
        />
        <Button onClick={this.props.handleLogin.bind(this)}>
            Login
        </Button>
    </div>
);

const elemLogin = (
    <div id="Login">
        <p>{this.props.username}님 안녕하세요.</p>
        <Button onClick={this.props.handleLogin.bind(this)}>
            Login
        </Button>
    </div>
);

class Login {
    constructor(props) {
        super(props);
    }

    handleClick() {
        this.props.onLogin()
    }

    render() {
    }
}

export default Login;
