import React, { Component } from 'react'
import Vote from './Vote'
import DateTimeTag from './DateTimeTag'
import Delete from './Delete'
import { handleDeleteCommentary } from '../actions/comments'
import { connect } from 'react-redux'

class Commentary extends Component {

    constructor(props) {
        super(props)
        this.state = {
            buttonsVisible: false
        }
    }

    onVoting = (vote) => {
        this.props.onCommentaryVoting(this.props.commentary.id, vote)
    }

    onChangeButtonsState = () => {
        !this.props.commentary.deleted && (
            this.setState(prevState => ({
                buttonsVisible: !prevState.buttonsVisible
            }))
        )
    }

    onYesClick = () => {
        this.props.dispatch(handleDeleteCommentary(this.props.commentary.id))
    }

    render() {
        const { author, body, timestamp, voteScore, deleted } = this.props.commentary

        return (
            <div className="commentary-container content hover-card" onMouseEnter={this.onChangeButtonsState} onMouseLeave={this.onChangeButtonsState}>
                <div className="columns">

                    <div className="column is-10">
                        {!deleted && (
                            <div className="buttons are-small commentary-buttons" style={{ display: this.state.buttonsVisible ? 'inline-flex' : 'none' }}>
                                <button className="button is-small">
                                    <span className="icon is-small">
                                        <i className="fas fa-edit"></i>
                                    </span>
                                </button>

                                <Delete closeModalAfterYes={true} onYesClick={this.onYesClick} deleteButtonLayout={
                                    <button className="button is-small is-danger is-outlined">
                                        <span className="icon is-small">
                                            <i className="fas fa-times"></i>
                                        </span>
                                    </button>
                                } />
                            </div>
                        )}

                        <blockquote>
                            {body}
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

export default connect()(Commentary)