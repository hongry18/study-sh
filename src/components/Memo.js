import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import PropTypes from 'prop-types';
import * as ui from 'semantic-ui-react';


class Memo extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handlePut = this.handlePut.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            isModifying: false,
            title: '',
            content: ''
        }
    }

    handleChange(e) {
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    handlePut(title, content) {
        return this.props.requestPut(title, content);
    }

    handleDelete(id) {
        return this.props.requestDelete(id);
    }

    render() {
        return (
            <div>
                {this.MemoForm(this.props.data, this.props.ownership)}
            </div>
        );
    }

    MemoForm(data, isOwner) {
        return (
            <div>
            <ui.Segment>
                <ui.Label><ui.Icon name='user' />{data.author}</ui.Label>
                <TimeAgo date={data.date}/>
                <h1>{data.title}</h1> 
                <p>{data.content}</p>
                {isOwner?this.PostMenu():undefined}
            </ui.Segment>
            </div>
        );
    };

    PostMenu() {
        return (
            <div>
                <ui.Button 
                    circular icon 
                    size='mini'
                    color='blue'
                >
                    <ui.Icon name='write' />
                </ui.Button>
                <ui.Button circular icon 
                    size='mini' 
                    color='red'
                >
                    <ui.Icon name='delete' />
                </ui.Button>
            </div>
        )
    }

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
