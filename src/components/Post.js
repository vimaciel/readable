import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleVotingPost } from "../actions/posts"
import PostHeader from './PostHeader'
import Vote from './Vote'
import PostFooter from './PostFooter'


class Post extends Component {
    state = {
        redirect: false
    }

    onPostVoting = (vote) => {
        this.props.dispatch(handleVotingPost(this.props.post.id, vote))
    }

    render() {

        if (this.props.post === null) {
            return <div className="content-container">
                <b>The post doesn't exist</b>
            </div>
        }

        const { title, author, body, voteScore } = this.props.post

        return (
            <div className="content-container hover-card" >
                <PostHeader post={this.props.post} />
                <div className="columns is-mobile is-gapless">
                    <div className="column is-10" onClick={this.onClickPost}>
                        <p className="title is-4">{title}</p>
                        <p className="subtitle">{author}</p>
                        <p className="body">{body}</p>
                    </div>
                    <div className="column is-2">
                        <Vote voteScore={voteScore} onVoting={this.onPostVoting} />
                    </div>
                </div>
                <PostFooter post={this.props.post} />
            </div>
        );
    }
}

function mapStateToProps({ posts }, { id }) {
    const post = posts[id]
    return {
        post: post ? post : null
    }
}

export default connect(mapStateToProps)(Post)