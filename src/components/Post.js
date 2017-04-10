import React from 'react';
import TimeAgo from 'react-timeago';

class Post extends React.Component {
    render() {
        const { data, ownership } = this.props;

        const dropDownMenu = (
            <div className="option-button">
                <a
                    className='dropdown-button'
                    id={`dropdown-button-${data._id}`}
                    data-activates={`dropdown-${data.postId}`}>
                >
                    <i className="material-icons icon-button">more_vert</i>
                </a>
                <ul id={`dropdown-${data._id}`} className='dropdown-content'>
                    <li><a>Edit</a></li>
                    <li><a>Remove</a></li>
                </ul>
            </div>
        );

        const postView = (
            <div className="card">
                <div className="info">
                    <a className="username">{data.writer}</a> wrote a log · <TimeAgo date={data.date.created}/>
                    { ownership ? dropDownMenu : undefined }
                </div>
                <div className="card-title">
                    {data.title}
                </div>
                <div className="card-content">
                    {data.content}
                </div>
                <div className="footer">
                    footer
                </div>
            </div>
        );

        return (
            <div className="container post">
                {postView}
            </div>
        );
    }

    componentDidUpdate() {
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }
 
    componentDidMount() {
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }
}

Post.propTypes = {
    data: React.PropTypes.object,
    ownership: React.PropTypes.bool
}

Post.defaultProps = {
    data: {
        _id: 'id1',
        postId: 0,
        title: 'title',
        content: 'content',
        author: 'hongry',
        userId: 0,
        date: {
            created: new Date(),
            modified: new Date()
        }
    },
    ownership: true
}

export default Post;
