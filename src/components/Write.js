import React, { Component } from 'react';
import * as ui from 'semantic-ui-react';


const initState = {
    title: '',
    content: '',
}

class Write extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = initState
    }

    handleSubmit(){
        this.props.onPost(this.state.title, this.state.content)
            .then(()=>{
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
            <div>
                {this.WriteForm()}
            </div>
        );
    }

    WriteForm() {
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
