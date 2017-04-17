import React from 'react';
import * as ui from 'semantic-ui-react';
import {Login} from '#/components';


class Header extends React.Component {
    render() {
        return (
            <ui.Menu secondary>
                <ui.Menu.Item header>MEMO</ui.Menu.Item>
                <ui.Menu.Item position='right'>
                    <Login />
                </ui.Menu.Item>
            </ui.Menu>
        );
    }
}

export default Header;
