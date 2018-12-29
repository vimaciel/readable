import React, { Component, Fragment } from 'react'
import { handlePostDetailInitialData } from "../actions/share"
import { handleSaveCommentary, handleVotingCommentary } from "../actions/comments"
import { connect } from 'react-redux'
import { handleVotingPost } from "../actions/posts"
import Commentary from "./Commentary"
import UserNameModal from './UserNameModal'
import Post from './Post'


class PostDetail extends Component {
    state = {
        post: {},
        commentary: '',
        username: '',
        comments: {},
        openModalUserName: false
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

    onCommentaryVoting = (id, vote) => {
        this.props.dispatch(handleVotingCommentary(id, vote))
    }

    onCommentaryChange = (e) => {
        this.setState({
            commentary: e.target.value
        })
    }

    onConfirmCommentary = (e) => {
        if (e.key === 'Enter') {
            this.onSubmitCommentary(e)
        }
    }

    onSubmitCommentary = (e) => {
        e.preventDefault()

        const { username } = this.state

        if (username === '') {
            this.setState({
                openModalUserName: true
            })

            return
        }

        this.saveCommentary(username)
    }

    saveCommentary = (username) => {
        const { commentary, post } = this.state

        if (commentary !== '') {
            const newCommentary = {
                body: commentary,
                author: username,
                parentId: post.id
            }

            this.props.dispatch(handleSaveCommentary(newCommentary))
            this.setState({
                commentary: ''
            })
        }
    }

    onCloseModal = (e) => {
        e.preventDefault()
        this.setState({
            openModalUserName: false
        })
    }

    onSubmitModal = (e, username) => {
        this.saveCommentary(username)
        this.onCloseModal(e)
    }

    render() {
        const { post, commentary, comments } = this.state

        const detailPostClass = `column ${!Object.keys(comments).length ? 'is-full' : 'is-three-fifths'}`
        return (
            <Fragment>
                <div className="columns">
                    <div className={detailPostClass}>
                        <Post post={post} />
                        <div className="commentary-field">
                            <div className="field has-addons">
                                <div className="control is-expanded">
                                    <input maxLength="100" className="input is-large" onKeyPress={this.onConfirmCommentary} value={commentary} onChange={this.onCommentaryChange} type="text" placeholder="Coment something..."></input>
                                </div>
                                <div className="control">
                                    <a href="/" onClick={this.onSubmitCommentary} className="button is-info is-large" disabled={commentary === ''}>
                                        Post
                                    </a>
                                </div>
                            </div>
                        </div>
                        {commentary.length > 0 && (
                            <div className="control commentary-counter">
                                <div className="tags has-addons">
                                    <span className="tag is-dark">{commentary.length}</span>
                                    <span className="tag is-info">100</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="column">
                        {Object.keys(comments).map(key => (
                            <Commentary key={key} commentary={comments[key]} onCommentaryVoting={this.onCommentaryVoting} />
                        ))}
                    </div>
                </div>
                <UserNameModal openModal={this.state.openModalUserName} onCloseModal={this.onCloseModal} onSubmitModal={this.onSubmitModal} />
            </Fragment>
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