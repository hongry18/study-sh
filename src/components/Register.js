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
            this.setState({
                err: '비밀번호가 일치하지 않습니다.',
            });
            return;
        }
        this.props.requestRegister(
            this.state.username,
            this.state.userpw,
            this.state.email
        ).then(() => {
            switch(this.props.register.status) {
                case 'SUCC': {
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
                    switch(this.props.register.code){
                        case 1:
                            this.setState({err: 'bad name'});
                            return false;
                        case 2:
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
            <ui.Segment>
                <h1>회원가입</h1>
                {this.RegisterForm()} 
                {this.props.register.code != -1
                        ?this.ErrorForm()
                        :undefined
                }
            </ui.Segment>

        );
    }

    RegisterForm() {
        return (
            <ui.Container>
                <ui.Input
                    fluid
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
                    fluid
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
                    fluid
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
                    fluid
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
                    fluid
                    onClick={this.handleSubmit}
                >
                    Submit
                </ui.Button>
            </ui.Container>
        );
    }

    ErrorForm() {
        return (
            <p>{this.state.err}</p>
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
