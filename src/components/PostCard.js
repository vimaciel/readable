import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import Vote from './Vote'
import { handleVotingPost } from '../actions/posts'

class PostCard extends Component {

    onPostVoting = (vote) => {
        this.props.dispatch(handleVotingPost(this.props.post.id, vote))
    }

    render() {
        const { title, body, author, voteScore, deleted } = this.props.post


        return (
            <div className="card hover-card">
                <header>
                    <PostHeader post={this.props.post} isDetailVisible={!deleted}/>
                </header>

                <div className="card-content">
                    <div className="columns is-mobile is-gapless">
                        <div className="column is-10">
                            <p className="title">{title}</p>
                            <p className="author">{author}</p>
                            <p className="body">"{body}"</p>
                        </div>
                        <div className="column is-2">
                            <Vote isSmallVote={true} voteScore={voteScore} onVoting={this.onPostVoting} />
                        </div>
                    </div>
                </div>

                <PostFooter post={this.props.post} isCard={true} />
            </div>
        )
    }
}

function mapStateToProps({ posts }, { id }) {
    const post = posts[id]
    return {
        post
    }
}

export default connect(mapStateToProps)(PostCard)