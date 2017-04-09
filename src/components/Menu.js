import React from 'react';

import Login from '~/components/Login';
import WriteButton from '~/components/WriteButton';


class Menu {
    render() {
        return (
            <div id="Menu">
                <Login/>
                <WriteButton/>
            </div>
        );
    }
}

export default Menu;
