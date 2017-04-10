import React from 'react';
import { Link } from 'react-router';

class NeededLogin extends React.Component {
    render() {
        return (
            <div className="container">
                Needed Login
                <Link to="/login">Login</Link>
            </div>
        );
    }
}

export default NeededLogin;
