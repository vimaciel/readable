import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSetAuthor } from '../actions/author'

class UserNameModal extends Component {
    state = {
        username: this.props.username || '',
        openModal: false
    }

    componentDidUpdate(prevProps) {
        if (prevProps.openModal !== this.props.openModal) {
            this.refInputUserName.focus()
            this.setState({
                openModal: this.props.openModal
            })
        }

        if (prevProps.username !== this.props.username) {
            this.refInputUserName.focus()
            this.setState({
                username: this.props.username
            })
        }
    }

    onChangeUserName = (e) => {
        const username = e.target.value
        this.setState({
            username
        })
    }

    onConfirmUserName = (e) => {
        if (e.key === 'Enter') {
            this.onSubmit(e)
        }
    }

    onSubmit = (e) => {
        e.preventDefault()

        const { username } = this.state

        this.props.setAuthor(username)

        if (this.props.onSubmitModal !== undefined) {
            this.props.onSubmitModal(e, username)
            return
        }


        this.props.onCloseModal(e)
    }

    render() {
        const openModal = this.props.openModal || false
        const modalClass = openModal ? 'modal is-active' : 'modal'

        return (
            <div className={modalClass}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="card is-mobile">
                        <div className="card-header">
                            <p className="card-header-title">What's your name?</p>
                        </div>
                        <div className="card-content">
                            <form onSubmit={this.onSubmit}>
                                <div className="field">
                                    <div className="control has-icons-left">
                                        <input ref={e => this.refInputUserName = e} className="input" value={this.state.username} onChange={this.onChangeUserName} type="text" placeholder="Type your name" onKeyPress={this.onConfirmUserName}></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-user"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button className="button is-link">Submit</button>
                                    </div>
                                    <div className="control">
                                        <a href="/" onClick={this.props.onCloseModal} className="button">Cancel</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps({ author }) {
    const username = author.username
    return {
        username
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setAuthor: (username) => {
            dispatch(handleSetAuthor(username))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNameModal)

