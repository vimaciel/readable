import React, { Component } from 'react'
import Vote from './Vote'

class Commentary extends Component {
    render() {
        return (
            <div className="commentary-container content hover-card">

                <div className="columns">
                    <div className="column is-10">
                        <blockquote>
                            This is just a simple commentary
                        </blockquote>
                        <nav className="level">
                            <div className="level-left">
                                <div className="level-item">

                                </div>
                                <div className="level-item">
                                    <strong><i>vimaciel</i></strong>
                                </div>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <div className="tags has-addons">
                                        <span className="tag">07/14/2016</span>
                                        <span className="tag is-info">07:02</span>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="column">
                        <Vote voteScore={0} isCommentaryVote={true}/>
                    </div>

                </div>

            </div>
        );
    }
}

export default Commentary