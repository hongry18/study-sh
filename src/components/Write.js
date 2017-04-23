import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ui from 'semantic-ui-react';


class Write extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            title: '',
            content: ''
        }
    }

    handleSubmit(){
        if (this.state.title == '') {
            //err 
            return console.log('no title');
        }
        if (this.state.content == '') {
            //err 
            return console.log('no content');
        }
        this.props.onPost(this.state.title, this.state.content)
            .then(()=>{
                if (this.props.postStatus == 'SUCC') {
                    //clear the state
                    this.setState({
                        title: '',
                        content: ''
                    });
                    //
                    //document.getElementById('write-title').value = '';
                    //document.getElementById('write-content').value = '';
                } else {
                    // show err msg...
                }
            })
        ;
    }

    handleChange(e){
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    render(){
        return (
            <div>
                {this.WriteForm()}
            </div>
        );
    }

    //componentWillReceiveProps(nextProps) {
    //    switch (nextProps.postStatus){
    //        case 'SUCC':
    //            this.setState(initState);
    //            return nextProps;
    //        case 'FAIL':
    //            return nextProps;
    //        case 'INIT':
    //            return nextProps;
    //        default:
    //            return nextProps;
    //    }
    //}

    WriteForm() {
        return (
            <ui.Segment>
                <ui.Form>
                    <ui.Input fluid>
                        <input id='write-title' name='title' placeholder='Title' value={this.state.title} onChange={this.handleChange} />
                    </ui.Input>
                    <ui.TextArea id='write-content' name='content' placeholder='content...' value={this.state.content} onChange={this.handleChange} />
                </ui.Form>
                <ui.Button fluid onClick={this.handleSubmit}>Post</ui.Button>
            </ui.Segment>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        postStatus: state.memo.post.status,
    };
}

Write.propTypes = {
    onPost: PropTypes.func,
    postStatus: PropTypes.string,
};

Write.defaultProps = {
    onPost: (contents) => { console.error('post function not defined'); },
    postStatus: '',
};

export default connect(mapStateToProps, undefined)(Write);
