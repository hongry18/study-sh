import React from 'react';
import { Authentication } from 'components';
import { connect } from 'react-redux';
import { registerRequest } from 'actions/authentication';
import { browserHistory } from 'react-router';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(id, pw, nick, email) {
        return this.props.registerRequest(id, pw, nick, email)
            .then(() => {
                if (this.props.status === 'SUCCESS') {
                    Materialize.toast('Success! Please log in.', 2000);
                    browserHistory.push('/login');
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">' + this.props.errorMessage + '</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            });
    }

    render() {
        return (
            <div>
                <Authentication
                    mode={false}
                    onRegister={this.handleRegister}
                />
            </div>
        );
    }
}

const mapState2Prop = (state) => {
    return {
        status: state.authentication.register.status,
        errorCode: state.authentication.register.error.code,
        errorMessage: state.authentication.register.error.error
    };
};

const mapDispatch2Prop = (dispatch) => {
    return {
        registerRequest: (id, pw, nick, email) => {
            return dispatch( registerRequest(id, pw, nick, email) );
        }
    };
};

export default connect(mapState2Prop, mapDispatch2Prop)(Register);
