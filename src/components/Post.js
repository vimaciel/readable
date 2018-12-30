import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPostCategoryHeader } from '../helpers/common'
import { Redirect } from 'react-router-dom'
import { handleVotingPost } from "../actions/posts"
import DateTimeTag from './DateTimeTag'
import Vote from './Vote'


class Post extends Component {
    state = {
        redirect: false
    }

    onPostVoting = (vote) => {
        this.props.dispatch(handleVotingPost(this.props.post.id, vote))
    }

    onClickPost = () => {
        this.setState({
            redirect: true
        })
    }

    render() {

        if (this.props.post === null) {
            return <div className="content-container">
                <b>The post doesn't exist</b>
            </div>
        }

        const { id, title, author, body, category, timestamp, voteScore } = this.props.post

        if (this.state.redirect) {
            return <Redirect push to={`/post/${id}/edit`}></Redirect>
        }

        return (
            <div className="content-container hover-card" >
                <nav className="level" onClick={this.onClickPost}>
                    {getPostCategoryHeader(category)}
                    <div className="level-right">
                        <div className="level-item">
                            <DateTimeTag dateTime={timestamp} />
                        </div>
                    </div>
                </nav>
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