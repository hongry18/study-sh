import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>header</h1>
                {this.props.isLoggedIn?<div>Hello</div>:undefined}
            </div>
        );
    }
}

export default Header;
