import React from 'react';
import * as ui from 'semantic-ui-react';

import {Memo} from '#/components';

class MemoList extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const data = this.props.data;
        const memos = data.map(memo => 
            <Memo data={memo}
                ownership={(memo.author === this.props.currentUser)}
                key={memo._id}
            />
        );

        return (
            <div>
                {memos}
            </div>
        );
    }
}

MemoList.propTypes = {
    data: React.PropTypes.array,
    currentUser: React.PropTypes.string
};

MemoList.defaultProps = {
    data: [],
    currentUser: ''
};

export default MemoList;
