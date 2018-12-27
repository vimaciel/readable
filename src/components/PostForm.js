import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import CategorySelection from './CategorySelection';
import UserNameModal from './UserNameModal'
import { Categories } from '../helpers/categoriesApi';
import * as postApi from '../helpers/postsApi'

class PostForm extends Component {
    state = {
        redirect: false,
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

        if (this.props.username === '') {
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

    onCloseModal = () => {
        this.setState({
            openModalUserName: false
        })
    }

    onSubmitModal = (_, username) => {
        this.savePost(username)
        this.onCloseModal()
    }

    savePost = (username) => {
        if (this.isFormValid()) {
            const { title, body } = this.state

            postApi.newPost({
                title: title.value,
                body: body.value,
                author: username,
                category: this.state.categorySelected
            })         

            this.setState({
                redirect: true
            })
        }
    }

    render() {
        const { title, body, redirect } = this.state

        if (redirect) {
            return <Redirect to='/' />
        }

        return (
            <div className="content-container">
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
                            <CategorySelection itemSelected={this.state.categorySelected} smallControl={true} hasAllItem={false} onCategorySelect={this.onCategorySelect} />
                        </div>

                        <div className="level-right">
                            <button className="button is-primary is-normal">Confirm</button>
                        </div>
                    </nav>
                </form>
                <UserNameModal openModal={this.state.openModalUserName} onCloseModal={this.onCloseModal} onSubmitModal={this.onSubmitModal} />
            </div>
        )
    }
}

function mapStateToProps({ author }) {
    const username = author.username !== undefined ? author.username : ''
    return {
        username
    }
}

export default connect(mapStateToProps)(PostForm)