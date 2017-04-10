import React from 'react';
import { connect } from 'react-redux';

class Write extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            isMounted: true
        }

        this.handleChange = this.handleChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handlePost() {
        let title = this.state.title;
        let content = this.state.content;

        this.props.onPost(title, content)
            .then( (e) => {
                console.log(this.props.postStatus);
                console.log(this.props.errorMessage);
            });
    }

    render() {
        return(
            <div className="container write">
                <div className="card">

                    <div className="input-field col s12 username">
                        <label>Title</label>
                        <input
                            name="title"
                            type="text"
                            className="validate"
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="card-content">
                        <textarea
                            className="materialize-textarea"
                            name="content"
                            placeholder="Write down your memo"
                            value={this.state.contents}
                            onChange={this.handleChange}
                        ></textarea>
                    </div>
                    <div className="card-action">
                        <a onClick={this.handlePost}>POST</a>
                    </div>
                </div>
            </div>
        );
    }
}

Write.propTypes = {
    onPost: React.PropTypes.func
};
 
Write.defaultProps = {
    onPost: (contents) => { console.error('post function not defined'); }
};

const mapState2Props = (state) => {
    return {
        postStatus: state.post.post.status,
        errorMessage: state.post.post.error
    };
};

export default connect(mapState2Props, null)(Write);
