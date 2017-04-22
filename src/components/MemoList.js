import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ui from 'semantic-ui-react';
import {
    Memo,
} from '#/components';


class MemoList extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const mapDataToMemo = this.props.data.map(memo => 
            <Memo data={memo}
                ownership={(memo.author === this.props.currentUser)}
                key={memo._id}
            />
        );
        return (
            <div>
                {mapDataToMemo}
            </div>
        );
    }
}

MemoList.propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string
};

MemoList.defaultProps = {
    data: [],
    currentUser: ''
};

export default MemoList;
