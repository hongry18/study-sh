import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {Write, MemoList} from '#/components';
import {requestMemoPost, requestMemoGet} from '#/actions/memo';

const mock_data = [
    {
        "_id": "578b958ec1da760909c263f4",
        "author": "velopert",
        "title": "Testing",
        "content": "content Testing",
        "date": "2016-07-17T14:26:22.428Z"
    },
    {
        "_id": "578b958ec1da760909c263f5",
        "author": "velopert",
        "title": "Testing2",
        "content": "content Testing",
        "date": "2016-07-18T14:26:22.428Z"
    },
    {
        "_id": "578b958ec1da760909c263f6",
        "author": "velopert",
        "title": "Testing3",
        "content": "content Testing",
        "date": "2016-07-19T14:26:22.428Z"
    }
];

class Home extends React.Component{
    componentDidMount(){
        this.props.requestMemoGet().then(()=>{
            console.log('didmount', this.props.data);
        });
    }

    constructor(props){
        super(props);
        this.handlePost = this.handlePost.bind(this);
    }

    handlePost(title, content) {
        return this.props.requestMemoPost(title, content);
    }

    render() {
        let write = (
            <Write onPost={this.handlePost} />   
        );

        return (
            <div>
                {this.props.isLoggedIn?write:undefined}
                <MemoList data={this.props.data} currentUser={this.props.currentUser} />
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.status.isLoggedIn,
        currentUser: state.auth.status.currentUser,
        postStatus: state.memo.post.status,
        getStatus: state.memo.get.status,
        data: state.memo.get.data
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        requestMemoPost: (title, content) => {
            return dispatch(requestMemoPost(title, content));
        },
        requestMemoGet: () => {
            return dispatch(requestMemoGet());
        }
    };
};

Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;
