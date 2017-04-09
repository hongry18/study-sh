import React from 'react';

import Menu from './Menu';


class Header extends React.Component {
    render() {
        return (
            <div id="Header">
                <h1>Blog</h1>
                <Menu />
            </div>
        );
    }
}

export default Header;
