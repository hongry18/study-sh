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
                putStatus={this.props.putStatus}
            />
        );
    }
}

MemoList.propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string,
    onPut: PropTypes.func,
    putStatus: PropTypes.string,
};

MemoList.defaultProps = {
    data: [],
    currentUser: '',
    onPut: (index, id, data) => { console.log('undefined!') },
};

export default MemoList;
