import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import * as ui from 'semantic-ui-react';
import { auth } from '#/actions';


class Register extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state= {
            username: '',
            userpw: '',
            userpw_confirm: '',
            email: '',
            err: ''
        }
    }

    handleChange(e) {
        let new_state = {};
        new_state[e.target.name] = e.target.value;
        this.setState(new_state);
    }

    handleSubmit() {
        if (this.state.userpw !== this.state.userpw_confirm) {
            error('pw mismatched');
            return;
        }
        this.props.requestRegister(
            this.state.username,
            this.state.userpw,
            this.state.email
        ).then(() => {
            switch(this.props.register.status) {
                case 'SUCC': {
                    log('register success');
                    this.setState ({
                        username: '',
                        userpw: '',
                        userpw_confirm: '',
                        email: '',
                        err: ''
                    });
                    browserHistory.goBack();
                    return false;
                }
                case 'FAIL': {
                    error('register failed');
                    console.log(this.props.register);
                    switch(this.props.register.code){
                        case 1:
                            log('bad name');
                            this.setState({err: 'bad name'});
                            return false;
                        case 2:
                            log('account exists');
                            this.setState({err: 'account exist'});
                            return false;
                        default:
                            return false;
                    }
                }
                default:
                    return false;
            }
        });
    }

    render() {
        return (
            <div>
                {this.RegisterForm()} 
                {this.props.register.code != -1
                        ?this.ErrorForm()
                        :undefined
                }
            </div>

        );
    }

    RegisterForm() {
        return (
            <div>
                <ui.Container>
                    <ui.Input
                        iconPosition="left"
                        placeholder="ID"
                        name="username"
                        type="text"
                        onChange={this.handleChange}
                    >
                        <ui.Icon name='user'/>
                        <input />
                    </ui.Input><br/>
                    <ui.Input
                        iconPosition="left"
                        placeholder="Password"
                        name="userpw"
                        type="password"
                        onChange={this.handleChange}
                    >
                        <ui.Icon name='lock'/>
                        <input />
                    </ui.Input><br/>
                    <ui.Input
                        iconPosition="left"
                        placeholder="Password Confirm"
                        name="userpw_confirm"
                        type="password"
                        onChange={this.handleChange}
                    >
                        <ui.Icon name='lock'/>
                        <input />
                    </ui.Input><br/>
                    <ui.Input
                        iconPosition="left"
                        placeholder="Email"
                        name="email"
                        type="text"
                        onChange={this.handleChange}
                    >
                        <ui.Icon name='at'/>
                        <input />
                    </ui.Input><br/>
                    <ui.Button
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </ui.Button>
                </ui.Container>
            </div>
        );
    }

    ErrorForm() {
        return (
            <ui.Label>{this.state.err}</ui.Label>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        register: state.auth.register
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        requestRegister: (id,pw,email) => {
            return dispatch(auth.requestRegister(id, pw, email));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
