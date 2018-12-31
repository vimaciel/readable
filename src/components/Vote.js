import React, { Component } from 'react'

class Vote extends Component {
    state = {
        upVote: 'upVote',
        downVote: 'downVote'
    } 

    render() {
        const { voteScore, isSmallVote = false } = this.props

        const classUp = `fas fa-caret-up ${isSmallVote? 'fa-2x' : 'fa-3x'}`
        const classDown =`fas fa-caret-down ${isSmallVote? 'fa-2x' : 'fa-3x'}`
        

        return (
            <div className="vote-element-box">
                <i className={classUp} onClick={_ => this.props.onVoting(this.state.upVote)}></i>
                <b style={{fontSize: isSmallVote? '1.2em': '1.7em'}}>{voteScore}</b>
                <i className={classDown} onClick={_ => this.props.onVoting(this.state.downVote)}></i>
            </div>
        );
    }
}

export default Vote