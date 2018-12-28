import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPostCategoryHeader } from '../helpers/common'
import DateTimeTag from './DateTimeTag'

class PostCard extends Component {
    render() {
        const { id, title, body, author, timestamp, category } = this.props.post

        return (
            <a href={`/post/${id}/detail`}>
                <div className="hover-card card">
                    <header>
                        <nav className="level">
                            {getPostCategoryHeader(category)}
                            <div className="level-right">
                                <div className="level-item">
                                    <DateTimeTag dateTime={timestamp}/>
                                </div>
                            </div>
                        </nav>
                    </header>

                    <div className="card-content">
                        <p className="title">{title}</p>
                        <p className="author">{author}</p>
                        <p className="body">"{body}"</p>
                    </div>
                </div>
            </a>
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