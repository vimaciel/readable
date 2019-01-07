import React, { Component, Fragment } from 'react'
import Vote from './Vote'
import DateTimeTag from './DateTimeTag'
import Delete from './Delete'
import { handleDeleteCommentary, handleSaveCommentary } from '../actions/comments'
import { connect } from 'react-redux'

class Commentary extends Component {

    state = {
        buttonsVisible: false,
        edit: false,
        commentary: ''
    }

    onVoting = (vote) => {
        this.props.onCommentaryVoting(this.props.commentary.id, vote)
    }

    onChangeButtonsState = () => {
        !this.props.commentary.deleted && !this.state.edit && (
            this.setState(prevState => ({
                buttonsVisible: !prevState.buttonsVisible
            }))
        )
    }

    onChangeEditState = () => {
        this.setState(prevState => ({
            edit: !prevState.edit,
            commentary: this.props.commentary.body
        }))
    }

    onCommentaryChange = (e) => {
        this.setState({
            commentary: e.target.value
        })
    }

    onYesClick = () => {
        this.props.deleteCommentary(this.props.commentary.id)
    }

    onConfirmSaveCommentary = (e) => {
        if (e.key === 'Enter') {
            this.onSaveCommentary()
        }
    }

    onSaveCommentary = () => {
        this.props.saveCommentary(this.props.commentary.id, this.state.commentary)
        this.onChangeEditState()
    }

    render() {
        const { author, body, timestamp, voteScore, deleted } = this.props.commentary
        const { edit, commentary } = this.state

        let headerButtons = (
            <Fragment>
                <button className="button is-normal" onClick={this.onChangeEditState} >
                    <span className="icon is-small">
                        <i className="fas fa-edit"></i>
                    </span>
                    <span>Edit</span>
                </button>

                <Delete closeModalAfterYes={true} onYesClick={this.onYesClick} deleteButtonLayout={
                    <button className="button is-normal is-danger is-outlined">
                        <span className="icon is-small">
                            <i className="fas fa-trash"></i>
                        </span>
                        <span>
                            Delete
                        </span>
                    </button>
                } />
            </Fragment>
        )

        if (edit) {
            headerButtons = (
                <Fragment>
                    {commentary.length > 0 && (
                        <button className="button is-primary is-outlined is-normal" onClick={this.onSaveCommentary} data-tooltip="Tooltip Text">
                            <span className="icon is-small">
                                <i className="fas fa-check"></i>
                            </span>
                            <span>
                                Save
                            </span>
                        </button>
                    )}

                    <button className="button is-danger is-outlined is-normal" onClick={this.onChangeEditState}>
                        <span className="icon is-small">
                            <i className="fas fa-times"></i>
                        </span>
                        <span>
                            Cancel
                        </span>
                    </button>

                </Fragment>
            )
        }

        return (
            <div className="commentary-container content hover-card" onMouseEnter={this.onChangeButtonsState} onMouseLeave={this.onChangeButtonsState}>
                <div className="columns">

                    <div className="column is-10">
                        {!deleted && (
                            <div className="buttons are-small commentary-buttons" style={{ display: this.state.buttonsVisible ? 'inline-flex' : 'none' }}>
                                {headerButtons}
                            </div>
                        )}

                        <blockquote>
                            {edit ? (
                                <input autoFocus ref={e => (this.refEditInput = e)} className="input" type="text" onKeyPress={this.onConfirmSaveCommentary} value={commentary} onChange={this.onCommentaryChange} placeholder="Your commentary"></input>
                            ) : <span>{body}</span>}
                        </blockquote>
                        <nav className="level">
                            <div className="level-left">
                                <div className="level-item">
                                    <strong><i>{author}</i></strong>
                                </div>
                            </div>
                            <div className="level-right">
                                {deleted && (
                                    <div className="level-item">
                                        <span className="tag fas fa-trash is-danger"></span>
                                    </div>
                                )}
                                <div className="level-item">
                                    <DateTimeTag dateTime={timestamp} />
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="column">
                        <Vote voteScore={voteScore} isSmallVote={true} onVoting={this.onVoting} />
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteCommentary: (commentaryId) => {
            dispatch(handleDeleteCommentary(commentaryId))
        },

        saveCommentary: (commentaryId, body) => {
            dispatch(handleSaveCommentary(commentaryId, body))
        }
    }
}

export default connect(null, mapDispatchToProps)(Commentary)