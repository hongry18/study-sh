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
        this.toggleModify = this.toggleModify.bind(this);
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

    toggleModify() {
        if (this.state.isModifying) {
            this.setState({
                isModifying: false,
            });
        } else {
            this.setState({ 
                isModifying: true ,
                title: this.props.data.title,
                content: this.props.data.content,
            });
        }
    }

    handlePut(){
        let newData = {
            title: this.state.title,
            content: this.state.content
        }
        this.props.onPut(this.props.index, this.props.data._id, newData)
            .then(() => {
                if (this.props.putStatus == 'SUCC') {
                    this.toggleModify();
                }
            })
        ;
    }

    handleDelete() {
        this.props.onDelete(this.props.index, this.props.data._id)
            .then(() => {
                // do sth
            })
        ;
    }

    render() {
        return (
            <div className="memo-wrapper">
                {this.state.isModifying
                    ? this.ModifyForm()
                    : this.MemoForm(this.props.data, this.props.ownership)
                }
            </div>
        );
    }

    MemoForm(data, isOwner) {
        return (
            <ui.Segment>
                <ui.Label><ui.Icon name="user" />{data.author}</ui.Label>
                <TimeAgo date={data.date}/>
                <h1>{data.title}</h1> 
                <p>{data.content}</p>
                {isOwner?this.PostMenu():undefined}
            </ui.Segment>
        );
    };

    ModifyForm() {
        return (
                <ui.Segment>
                    <ui.Form>
                        <ui.Input
                            fluid
                        >
                            <input
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                        </ui.Input> 
                        <ui.TextArea
                            name="content"
                            value={this.state.content}
                            onChange={this.handleChange}
                        />
                    </ui.Form>
                    <ui.Button fluid 
                        onClick={this.handlePut}
                    >Modify</ui.Button>
                </ui.Segment>
        );
    }

    PostMenu() {
        return (
            <div>
                <ui.Button 
                    circular icon 
                    size='mini'
                    color='blue'
                    onClick={this.toggleModify}
                >
                    <ui.Icon name='write' />
                </ui.Button>
                <ui.Button circular icon 
                    size='mini' 
                    color='red'
                    onClick={this.handleDelete}
                >
                    <ui.Icon name='delete' />
                </ui.Button>
            </div>
        )
    }

}

Memo.propTypes = {
    index: PropTypes.number,
    data: PropTypes.object,
    ownership: PropTypes.bool,
    putStatus: PropTypes.string,
    deleteStatus: PropTypes.string,
    onPut: PropTypes.func,
    onDelete: PropTypes.func,
};

Memo.defaultProps = {
    index: -1,
    data: {
        _id: 'id1234567890',
        author: 'Writer',
        title: 'Title',
        content: 'Contents',
        date: new Date(),
    },
    ownership: false,
    putStatus: 'INIT',
    deleteStatus: 'INIT',
    onPut: (index, id, data) => { console.log('undefined!') },
    onDelete: (index, id) => { console.log('undefined!') },
}

export default Memo;
