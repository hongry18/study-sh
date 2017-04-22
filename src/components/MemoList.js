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
        return (
            <div>
                {this.mapDataToMemo(this.props.data, this.props.currentUser)}
            </div>
        );
    }

    mapDataToMemo(data, username){
        return data.map(memo => 
            <Memo data={memo}
                ownership={(memo.author === username)}
                key={memo._id}
            />
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
