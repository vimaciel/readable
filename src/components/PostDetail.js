import React, { Component, Fragment } from 'react'
import { handleSaveCommentary, handleVotingCommentary, handleGetComments } from "../actions/comments"
import { connect } from 'react-redux'
import Commentary from "./Commentary"
import UserNameModal from './UserNameModal'
import Post from './Post'
import { isObjectEmpty } from '../helpers/common'



class PostDetail extends Component {
    state = {
        commentary: '',
        username: '',
        comments: {},
        openModalUserName: false
    }

    componentDidMount() {
        const { match, dispatch } = this.props
        const { id } = match.params

        dispatch(handleGetComments(id))
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
        const { commentary } = this.state
        const { postId, comments } = this.props

        const detailPostClass = `column ${isObjectEmpty(comments) ? 'is-full' : 'is-three-fifths'}`
        
        return (
            <Fragment>
                <div className="columns">
                    <div className={detailPostClass}>
                        <Post id={postId} />
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
        postId: Object.keys(posts).find(key => posts[key].id === id),
        username: author.username,
        comments
    }
}

export default connect(mapStateToProps)(PostDetail)