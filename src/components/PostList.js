import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

class PostList extends React.Component {
    render() {
        const map2Components = data => {
            return data.map((post, i) => {
                return (
                    <Post
                        data={post}
                        ownership={ (post.author === this.props.currentUser) }
                        key={post._id}
                    />
                );
            });
        }

        return (
            <div>
                {map2Components(this.props.data)}
            </div>
        );
    }
}

PostList.propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string
};
 
PostList.defaultProps = {
    data: [],
    currentUser: ''
};

export default PostList;
