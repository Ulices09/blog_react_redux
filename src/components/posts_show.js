import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost } from '../actions'
import { Link } from 'react-router-dom'
import { deletePost } from '../actions'

class PostsShow extends Component {
    
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push("/");
        });
    }

    render() {
        const { post } = this.props;

        if(!post) {
            return <div>Loading...</div>
        }

        return(
            <div className="card mt-5">
                <div className="card-block">
                    <Link to="/">Back</Link>
                    <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger btn-sm float-right">Delete Post</button>
                    <h3 className="mt-3">{post.title}</h3>
                    <h6>Categpries: {post.categories}</h6>
                    <p>{post.content}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);