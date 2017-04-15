import React from 'react';
import {Link} from 'react-router';

import {Login} from '#/components';

class Home extends React.Component{
    render() {
        return (
            <div>
                <Link to="/signin">
                    sign in
                </Link>
                HOMEPAGE
            </div>
        );
    }
}

export default Home;
