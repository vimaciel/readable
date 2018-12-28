import React, { Component } from 'react'
import Commentary from "./Commentary"
import { handlePostDetailInitialData } from "../actions/share"
import { handleSaveCommentary } from "../actions/comments"
import { connect } from 'react-redux'
import { getPostCategoryHeader } from '../helpers/common'
import Vote from './Vote'
import { handleVotingPost } from "../actions/posts"
import DateTimeTag from './DateTimeTag'


class PostDetail extends Component {
    state = {
        post: {},
        commentary: '',
        username: '',
        comments: {}
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.dispatch(handlePostDetailInitialData(id))
    }

    componentWillUpdate(prevProps) {
        if (prevProps.post !== this.state.post) {
            this.setState({
                post: prevProps.post
            })
        }

        if (prevProps.username !== this.state.username) {
            this.setState({
                username: prevProps.username
            })
        }

        if (prevProps.comments !== this.state.comments) {
            this.setState({
                comments: prevProps.comments
            })
        }
    }

    onPostVoting = (vote) => {
        this.props.dispatch(handleVotingPost(this.state.post.id, vote))
    }

    onCommentaryChange = (e) => {
        this.setState({
            commentary: e.target.value
        })
    }

    onConfirmCommentary = (e) => {
        if (e.key === 'Enter') {
            this.saveCommentary()
        }
    }

    onSubmitCommentary = (e) => {
        e.preventDefault()
        this.saveCommentary()
    }

    saveCommentary = () => {
        const { commentary, post, username } = this.state

        if (commentary !== '') {
            const newCommentary = {
                body: commentary,
                author: username,
                parentId: post.id
            }

            this.props.dispatch(handleSaveCommentary(newCommentary))
        }
    }

    render() {
        const { title, author, body, category, timestamp, voteScore } = this.state.post
        const { commentary } = this.state
        return (
            <div className="columns">
                <div className="column is-three-fifths">
                    <div className="content-container">
                        <nav className="level">
                            {getPostCategoryHeader(category)}
                            <div className="level-right">
                                <div className="level-item">
                                    <DateTimeTag dateTime={timestamp} />
                                </div>
                            </div>
                        </nav>
                        <div className="columns is-mobile is-gapless">
                            <div className="column is-10">
                                <p className="title is-4">{title}</p>
                                <p className="subtitle">{author}</p>
                                <p className="body">{body}</p>
                            </div>
                            <div className="column is-2">
                                <Vote voteScore={voteScore} onVoting={this.onPostVoting} />
                            </div>
                        </div>
                    </div>
                    <div className="commentary-field">
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input className="input is-large" onKeyPress={this.onConfirmCommentary} value={commentary} onChange={this.onCommentaryChange} type="text" placeholder="Coment something..."></input>
                            </div>
                            <div className="control">
                                <a href="/" onClick={this.onSubmitCommentary} className="button is-info is-large" disabled={commentary === ''}>
                                    Post
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <Commentary />
                </div>
            </div>
        );
    }
}

function mapStateToProps({ posts, author, comments }, props) {
    const { id } = props.match.params
    return {
        post: posts[id],
        username: author.username,
        comments
    }
}

export default connect(mapStateToProps)(PostDetail)