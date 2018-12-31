import React, { Component } from 'react'
import Vote from './Vote'
import DateTimeTag from './DateTimeTag'

class Commentary extends Component {
    onVoting = (vote) => {
        this.props.onCommentaryVoting(this.props.commentary.id, vote)
    }  

    render() {
        const { author, body, timestamp, voteScore } = this.props.commentary
        return (
            <div className="commentary-container content hover-card">
                <div className="columns">
                    <div className="column is-10">
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

export default Commentary