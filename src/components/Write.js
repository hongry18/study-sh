import React from 'react';

import * as ui from 'semantic-ui-react';

class Write extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        // init state
        this.state = {
            title: '',
            content: ''
        }
    }

    handleSubmit(){
        this.props.onPost(this.state.title, this.state.content)
            .then(()=>{
                let initState = {
                    title: '',
                    content: ''
                };
                this.setState(initState);
            });
    }

    handleChange(e){
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    render(){
        return (
            <ui.Segment>
                <ui.Form>
                    <ui.Input fluid name='title' placeholder='Title' onChange={this.handleChange} />
                    <ui.TextArea name='content' placeholder='content...' onChange={this.handleChange}/>
                </ui.Form>
                <ui.Button fluid onClick={this.handleSubmit}>Post</ui.Button>
            </ui.Segment>
        );
    }
}

export default Write;
