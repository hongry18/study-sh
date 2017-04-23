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
        return data.map((memo, i) => 
            <Memo data={memo}
                ownership={(memo.author === username)}
                key={memo._id}
                index={i}
                onPut={this.props.onPut}
                onDelete={this.props.onDelete}
                putStatus={this.props.putStatus}
                deleteStatus={this.props.deleteStatus}
            />
        );
    }
}

MemoList.propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string,
    onPut: PropTypes.func,
    onDelete: PropTypes.func,
    putStatus: PropTypes.string,
    deleteStatus: PropTypes.string,
};

MemoList.defaultProps = {
    data: [],
    currentUser: '',
    onPut: (index, id, data) => { console.log('undefined!') },
    onDelte: (index, id) => { console.log('undefined!') },
    putStatus: 'INIT',
    deleteStatus: 'INIT',
};

export default MemoList;
