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
        this.handlePut = this.handlePut.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.loadNewMemo = this.loadNewMemo.bind(this);
    }

    loadNewMemo() {
        if (this.props.getStatus == 'WAIT'){
            // prevent querying while waiting response
            return new Promise((resolve, reject) => {
                resolve();
            });
        }
        if (this.props.data.length == 0){
            return this.props.requestMemoGet(true);
        }
        return this.props.requestMemoGet(false, 'new', this.props.data[0]._id);
    }

    handlePost(title, content) {
        return this.props.requestMemoPost(title, content)
            .then(() => {
                return new Promise((resolve, reject) => {
                    if (this.props.postStatus == 'SUCC') {
                        this.loadNewMemo();
                        resolve();
                    }
                });
            });
    }

    handlePut(index, id, data){
        return this.props.requestMemoPut(index, id, data)
            .then(() => {
                //do something
            })
        ;
    }

    handleDelete(index, id){
        return this.props.requestMemoDelete(index, id)
            .then(() => {
                //do something
            })
        ;
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
                    onPut={this.handlePut}
                    onDelete={this.handleDelete}
                    putStatus={this.props.putStatus}
                    deleteStatus={this.props.deleteStatus}
                />
            </div>
        );
    }

    componentDidMount(){
        const loadNewMemoLoop = () => {
            this.loadNewMemo().then(() => {
                this.loopLoadNewMemoTimeout = setTimeout(loadNewMemoLoop, 5000);
            });
        };
        //load unconditionally
        this.props.requestMemoGet(true).then(()=>{
            loadNewMemoLoop(); // start the loop
        });
    }

    componentWillUnmount(){
        clearTimeout(this.loopLoadNewMemoTimeout);
    }
}

let mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.status.isLoggedIn,
        currentUser: state.auth.status.currentUser,
        data: state.memo.get.data,
        getStatus: state.memo.get.status,
        postStatus: state.memo.post.status,
        putStatus: state.memo.put.status,
        deleteStatus: state.memo.delete.status,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        requestMemoPost: (title, content) => {
            return dispatch(memo.requestPost(title, content));
        },
        requestMemoGet: (isInitial, listStyle, memoId) => {
            return dispatch(memo.requestGet(isInitial, listStyle, memoId));
        },
        requestMemoPut: (index, id, data) => {
            return dispatch(memo.requestPut(index, id, data));
        },
        requestMemoDelete: (index, id) => {
            return dispatch(memo.requestDelete(index, id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
