import React, { Component } from 'react'
import { connect } from 'react-redux'

class CommentaryField extends Component {
    state = {
        commentary: ''
    }

    onCommentaryChange = (e) => {
        this.setState({
            commentary: e.target.value
        })
    }

    render() {
        const { commentary } = this.state

        return (
            <div>
                <div className="commentary-field">
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input maxLength="100" className="input is-large" onKeyPress={this.onConfirmCommentary} value={commentary} onChange={this.onCommentaryChange} type="text" placeholder="Coment something..."></input>
                        </div>
                        <div className="control">
                            <a href="/" onClick={this.onSubmitCommentary} className="button is-info is-large" disabled={commentary === ''}>
                                Post
                            </a>
                        </div>
                    </div>
                </div>
                {commentary.length > 0 && (
                    <div className="control commentary-counter">
                        <div className="tags has-addons">
                            <span className="tag is-dark">{commentary.length}</span>
                            <span className="tag is-info">100</span>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps() {
    return {

    }
}

export default connect(mapStateToProps)(CommentaryField)