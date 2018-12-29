import React, { PureComponent } from 'react';

class Delete extends PureComponent {
    state = {
        message: this.props.message || 'Do you want delete?',
        openModal: false
    }

    onDeleteClick = (e) => {
        e.preventDefault()
        this.setState({
            openModal: true
        })
    }

    onCloseModal = (e) => {
        e.preventDefault()
        this.setState({
            openModal: false
        })
    }

    onYesClick = (e) => {
        e.preventDefault()
        this.props.onYesClick(e)
    }

    render() {
        const { openModal, message } = this.state
        const modalClass = openModal ? 'modal is-active' : 'modal'

        return (
            <div>
                <a href="/" className="button is-danger is-outlined" onClick={this.onDeleteClick}>
                    <span>Delete</span>
                    <span className="icon is-small">
                        <i className="fas fa-times"></i>
                    </span>
                </a>
                <div className={modalClass}>
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="card is-mobile">
                            <div className="card-header">
                                <p className="card-header-title">{message}</p>
                            </div>
                            <div className="card-content">
                                <div className="field is-grouped">
                                    <div className="control">
                                        <a href="/" onClick={this.onYesClick} className="button is-link">Yes</a>
                                    </div>
                                    <div className="control">
                                        <a href="/" onClick={this.onCloseModal} className="button">No</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Delete;