import React, { Component, Fragment } from 'react'
import { handleSaveCommentary, handleVotingCommentary, handleGetComments } from "../actions/comments"
import { connect } from 'react-redux'
import Commentary from "./Commentary"
import UserNameModal from './UserNameModal'
import Post from './Post'
import { isObjectEmpty } from '../helpers/common'
import CommentaryField from './CommentaryField'


class PostDetail extends Component {
    state = {        
        username: '',
        comments: {},
        openModalUserName: false
    }

    componentDidMount() {
        const { match, dispatch } = this.props
        const postId = match.params.post_id

        dispatch(handleGetComments(postId))
    }

    onCommentaryVoting = (id, vote) => {
        this.props.dispatch(handleVotingCommentary(id, vote))
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
        const { postId, comments } = this.props

        const detailPostClass = `column ${isObjectEmpty(comments) ? 'is-full' : 'is-three-fifths'}`

        return (
            <Fragment>
                <div className="columns">
                    <div className={detailPostClass}>
                        <Post id={postId} />
                        <CommentaryField />
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
    const id = props.match.params.post_id

    return {
        postId: Object.keys(posts).find(key => posts[key].id === id),
        username: author.username,
        comments
    }
}

export default connect(mapStateToProps)(PostDetail)


