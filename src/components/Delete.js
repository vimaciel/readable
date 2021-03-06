import React, { PureComponent, Fragment } from 'react';

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
        this.props.closeModalAfterYes && this.onCloseModal(e)
    }

    render() {
        const { openModal, message } = this.state
        const modalClass = openModal ? 'modal is-active' : 'modal'

        const { deleteButtonLayout } = this.props
        let deleteButton = (
            <button className="button is-danger delete-button is-outlined" onClick={this.onDeleteClick}>
                <span>Delete</span>
                <span className="icon is-small">
                    <i className="fas fa-times"></i>
                </span>
            </button>
        )       

        if (deleteButtonLayout !== undefined) {
            deleteButton = <div onClick={this.onDeleteClick}>
                {deleteButtonLayout}
            </div>
        }


        return (
            <Fragment>
                <div onClick={this.onDeleteClick} />
                {deleteButton}
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
                                        <button onClick={this.onYesClick} className="button is-link button-yes">Yes</button>
                                    </div>
                                    <div className="control">
                                        <button onClick={this.onCloseModal} className="button">No</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Delete;