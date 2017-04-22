import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import PropTypes from 'prop-types';
import * as ui from 'semantic-ui-react';


class Memo extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                {this.MemoForm(this.props.data)}
            </div>
        );
    }

    MemoForm(data) {
        return (
            <div>
            <ui.Segment>
                <ui.Label><ui.Icon name='write'/>{data.author}</ui.Label>
                <TimeAgo date={data.date}/>
                <h1>{data.title}</h1>
                <p>{data.content}</p>
                <ui.Button>Edit</ui.Button>
                <ui.Button>Delete</ui.Button>
            </ui.Segment>
            </div>
        );
    };

}

Memo.propTypes = {
    data: PropTypes.object,
    ownership: PropTypes.bool
};

Memo.defaultProps = {
    data: {
        _id: 'id1234567890',
        author: 'Writer',
        title: 'Title',
        content: 'Contents',
        date: new Date(),
    },
    ownership: true
}

export default Memo;
