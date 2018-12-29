import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleDeletePost } from '../actions/posts'
import { Categories } from '../helpers/categoriesApi'
import DateTimeTag from './DateTimeTag'
import CategorySelection from './CategorySelection'
import UserNameModal from './UserNameModal'
import * as postApi from '../helpers/postsApi'
import { isObjectEmpty, getPostCategoryHeader } from '../helpers/common'
import Delete from './Delete'

class PostForm extends Component {
    state = {
        redirect: false,
        redirectTo: '',
        categorySelected: Categories.react,
        openModalUserName: false,
        title: {
            value: '',
            valid: true
        },
        body: {
            value: '',
            valid: true
        }
    }

    titleOnChange = (e) => {
        const value = e.target.value
        this.setState(prevState => ({
            title: {
                ...prevState.title,
                value,
                valid: value !== ''
            }
        }))
    }

    bodyOnChange = (e) => {
        const value = e.target.value
        this.setState(prevState => ({
            body: {
                ...prevState.body,
                value,
                valid: value !== ''
            }
        }))
    }

    onSubmit = (e) => {
        e.preventDefault()

        // Only shows the modal username when is a new post
        if (isObjectEmpty(this.state.post) && this.props.username === '') {
            this.setState({
                openModalUserName: true
            })

            return
        }

        this.savePost(this.props.username)
    }

    isFormValid = () => {
        const { title, body } = this.state
        const validTitle = title.value !== ''
        const validBody = body.value !== ''

        this.setState({
            title: {
                ...title,
                valid: validTitle
            },
            body: {
                ...body,
                valid: validBody
            }

        })

        return validTitle || validBody

    }

    onCategorySelect = (categorySelected) => {
        this.setState({
            categorySelected
        })
    }

    onCloseModal = (e) => {
        e.preventDefault()

        this.setState({
            openModalUserName: false
        })
    }

    onSubmitModal = (e, username) => {
        this.savePost(username)
        this.onCloseModal(e)
    }

    savePost = (username) => {
        if (this.isFormValid()) {
            const { title, body, post } = this.state
            const id = isObjectEmpty(post) ? null : post.id

            postApi.savePost({
                id,
                title: title.value,
                body: body.value,
                author: username,
                category: this.state.categorySelected
            })

            this.setState({
                redirect: true,
                redirectTo: id !== null ? `/post/${id}/detail` : '/'
            })
        }
    }

    onDeletePost = () => {
        this.props.dispatch(handleDeletePost(this.props.post.id))
        this.props.history.push('/')
    }

    componentWillMount() {
        console.log(this.props.posts)
    }

    render() {
        const { title, body, redirect, redirectTo } = this.state
        const { post } = this.props     
        const isEdit = !isObjectEmpty(post)
        

        if (redirect) {
            return <Redirect to={redirectTo} />
        }

        return (
            <div className="content-container">

                {isEdit && (
                    <nav className="level">
                        {getPostCategoryHeader(post.category)}
                        <div className="level-right">
                            <div className="level-item">
                                <DateTimeTag dateTime={post.timestamp} />
                            </div>
                        </div>
                    </nav>
                )}

                <form onSubmit={this.onSubmit}>

                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input type="text" className={title.valid ? 'input' : 'input is-danger'} value={title.value} onChange={this.titleOnChange} placeholder="React is awesome." />
                            {!title.valid && <p className="help is-danger">Title is required</p>}
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Message post</label>
                        <div className="control">
                            <textarea className={body.valid ? 'textarea' : 'textarea is-danger'} placeholder="With Udacity's React Nanodegree I'm ready to work with React." value={body.value} onChange={this.bodyOnChange}></textarea>
                            {!body.valid && <p className="help is-danger">Message body is required</p>}
                        </div>
                    </div>

                    <nav className="level is-mobile">
                        <div className="level-left">
                            {isEdit ? (
                                <Delete onYesClick={this.onDeletePost} />
                            ):                           
                            (
                                <CategorySelection itemSelected={this.state.categorySelected} smallControl={true} hasAllItem={false} onCategorySelect={this.onCategorySelect} />
                            )}
                        </div>

                        <div className="level-right">
                            <button className="button is-success">
                                <span className="icon is-small">
                                    <i className="fas fa-check"></i>
                                </span>
                                <span>Save</span>
                            </button>
                        </div>
                    </nav>
                </form>
                <UserNameModal openModal={this.state.openModalUserName} onCloseModal={this.onCloseModal} onSubmitModal={this.onSubmitModal} />
            </div>
        )
    }
}

function mapStateToProps({ author, posts }, props) {
    const username = author.username !== undefined ? author.username : ''
    const { id } = props.match.params
    const key = Object.keys(posts).filter(key => posts[key].id === id)
    const post = posts[key]
    return {
        username,
        post: post ? post : {}
    }
}

export default connect(mapStateToProps)(PostForm)