import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { memo } from '#/actions';
import {
    Write,
    MemoList
} from '#/components';


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

class Home extends Component{
    constructor(props){
        super(props);
        this.handlePost = this.handlePost.bind(this);
    }

    handlePost(title, content) {
        return this.props.requestPost(title, content);
    }

    render() {
        return (
            <div>
                {this.props.isLoggedIn
                        ? <Write onPost={this.handlePost} />   
                        : undefined
                }
                <MemoList
                    data={this.props.data}
                    currentUser={this.props.currentUser}
                />
            </div>
        );
    }

    componentDidMount(){
        //load unconditionally
        this.props.requestMemoGet(true).then(()=>{
            //do somthing
        });
    }
}

let mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.status.isLoggedIn,
        currentUser: state.auth.status.currentUser,
        data: state.memo.get.data
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        requestMemoPost: (title, content) => {
            return dispatch(memo.requestPost(title, content));
        },
        requestMemoGet: (isInitial) => {
            return dispatch(memo.requestGet(isInitial));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
