import React from 'react';
import { connect } from 'react-redux';
import { PostList } from 'components';
import { postListRequest } from 'actions/post';

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.postListRequest(true);
    }

    render() {
        var mockData = [
            {
                "_id": "578b958ec1da760909c263f4",
                "postId": 0,
                "userId": 0,
                "author": "velopert",
                "contents": "Testing",
                "title": "title1",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:22.428Z",
                    "created": "2016-07-17T14:26:22.428Z"
                }
            },
            {
                "_id": "578b957ec1da760909c263f3",
                "postId": 0,
                "userId": 0,
                "author": "velopert",
                "contents": "Data",
                "title": "title2",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:06.999Z",
                    "created": "2016-07-17T14:26:06.999Z"
                }
            }
        ];

        return (
            <div className="wrapper">
                <PostList
                    data={this.props.postData}
                    currentUser={this.props.currentUser}
                />
            </div>
        );
    }
}

const mapState2Props = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        currentUser: state.authentication.status.currentUser,
        postData: state.post.list.data
    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        postListRequest: (isInitail, listType, id, username) => {
            return dispatch(postListRequest(isInitail, listType, id, username));
        }
    }
}

export default connect(mapState2Props, mapDispatch2Props)(Home);
