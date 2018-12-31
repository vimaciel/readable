import React, { Component } from 'react'
import { capitalizeFirstLetter, getPostCategoryHeader } from '../helpers/common'
import Delete from './Delete'
import { connect } from 'react-redux'
import { handleDeletePost } from '../actions/posts'
import { withRouter } from 'react-router-dom'


class PostHeader extends Component {
    onDeletePost = () => {
        const { post, dispatch } = this.props
        dispatch(handleDeletePost(post.id))
        this.props.history.push('/')
    }

    onEditClick = (e) => {
        e.preventDefault()
        const { id } = this.props.post
        this.props.history.push(`/post/${id}/edit`)
    }

    render() {
        const { category } = this.props.post
        const categoryInfo = getPostCategoryHeader(category)

        return (
            <nav className="level">
                <div className="level-left">
                    <div className="level-item">
                        <figure className="image is-48x48">
                            <img className="is-rounded" alt={categoryInfo.alt} src={categoryInfo.icon} />
                        </figure>
                    </div>
                    <div className="level-item">
                        <b style={{ color: categoryInfo.color }}>{capitalizeFirstLetter(category)}</b>
                    </div>
                </div>
                <div className="level-right">
                    <div className="buttons">
                        <Delete onYesClick={this.onDeletePost} />
                        <button onClick={this.onEditClick} className="button">
                            <span>Edit</span>
                            <span className="icon is-small">
                                <i className="fas fa-edit"></i>
                            </span>
                        </button>
                    </div>
                </div>
            </nav>
        )
    }
}

export default withRouter(connect()(PostHeader))