import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddNewCommentary } from "../actions/comments"
import UserNameModal from './UserNameModal'

export class CommentaryField extends Component {
    state = {
        commentary: '',
        openModalUserName: false
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

        const { username } = this.props

        if (username === undefined || username === '') {
            this.setState({
                openModalUserName: true
            })

            return
        }

        this.saveCommentary(username)
        this.props.onAddNewCommentary()
    }

    saveCommentary = (username) => {
        if (this.state.commentary !== '') {
            const newCommentary = {
                body: this.state.commentary,
                author: username,
                parentId: this.props.post.id
            }

            this.props.addNewCommentary(newCommentary)
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
        this.props.onAddNewCommentary()
        this.onCloseModal(e)
    }

    render() {
        const { commentary, openModalUserName } = this.state

        return (
            <div>
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
                <UserNameModal openModal={openModalUserName} onCloseModal={this.onCloseModal} onSubmitModal={this.onSubmitModal} />
            </div>
        )
    }
}

function mapStateToProps({ author }, { post }) {
    return {
        post,
        username: author.username
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNewCommentary: (commentary) => {
            dispatch(handleAddNewCommentary(commentary))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentaryField)