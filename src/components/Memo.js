import React from 'react';
import TimeAgo from 'react-timeago';
import * as ui from 'semantic-ui-react';

class Memo extends React.Component {
    constructor(props){
        super(props)
    }

    memo_view(data) {
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
    }

    render(){
        return (
            <div>
                {this.memo_view(this.props.data)}
            </div>
        );
    }
}

Memo.propTypes = {
    data: React.PropTypes.object,
    ownership: React.PropTypes.bool
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
