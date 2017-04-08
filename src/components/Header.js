import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
    render() {
        const loginButton = (
            <li>
                <Link to="/login">
                    <i className="material-icons">vpn_key</i>
                </Link>
            </li>
        );

        const logoutButton = (
            <li>
                <a onClick={this.props.onLogout}>
                    <i className="material-icons">lock_open</i>
                </a>
            </li>
        );

        return (
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <Link className="brand-logo center">MEMOPAD</Link>
 
                    <ul>
                        <li><a><i className="material-icons">search</i></a></li>
                    </ul>
 
                    <div className="right">
                        <ul>
                            {loginButton}
                            {logoutButton}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
 
export default Header;