import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleVotingPost } from "../actions/posts"
import PostHeader from './PostHeader'
import Vote from './Vote'
import PostFooter from './PostFooter'

class Post extends Component {

    onPostVoting = (vote) => {
        this.props.votingPost(this.props.post.id, vote)
    }

    render() {

        const { title, author, body, voteScore } = this.props.post

        return (
            <div className="content-container hover-card" >
                <PostHeader post={this.props.post} isDeleteVisible={true} isEditVisible={true} />
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

function mapDispatchToProps(dispatch) {
    return {
        votingPost: (postId, vote) => {
            dispatch(handleVotingPost(postId, vote))
        }
    }
}

export default connect(null, mapDispatchToProps)(Post)