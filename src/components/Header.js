import React from 'react';

import Menu from '~/components/Menu';


class Header {
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
