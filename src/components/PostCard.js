import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTimeStamp, getPostCategoryHeader } from '../helpers/common'

class PostCard extends Component {
    render() {
        const post = this.props.post
        const { title, body, author, timestamp, category } = post

        return (
            <div className="card">
                <header>
                    <nav className="level">
                        {getPostCategoryHeader(category)}
                        <div className="level-right">
                            <div className="level-item">
                                <p className="datetime">{formatTimeStamp(timestamp)}</p>
                            </div>
                        </div>
                    </nav>
                </header>

                <div className="card-content">
                    <p className="title">{title}</p>
                    <p className="author">{author}</p>
                    <p className="body">"{body}"</p>
                </div>

                <footer>
                    <a className="button is-white" href="https://twitter.com/codinghorror/status/506010907021828096">+ detail</a>
                </footer>
            </div>
        )
    }
}

function mapStateToProps({ posts }, { id }) {
    const post = posts[id]
    return {
        post
    }
}

export default connect(mapStateToProps)(PostCard)