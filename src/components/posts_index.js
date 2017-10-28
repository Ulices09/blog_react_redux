import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'

class PostsIndex extends Component {

    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {

        return _.map(this.props.posts, post => {
            return (
                <li key={post.id} className="list-group-item">                    
                    <Link to={`/posts/${post.id}`}>
                        { post.title }
                    </Link>
                </li>
            );
        });
    }

    render() {
        return(
            <div className="mt-5">
                <div className="text-right">
                    <Link className="btn btn-primary btn-sm" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {posts: state.posts}
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);