import React, { Component } from 'react'
import { connect } from 'react-redux'
import Vote from './Vote'
import DateTimeTag from './DateTimeTag'
import { getPostCategoryHeader } from '../helpers/common'
import { Redirect } from 'react-router-dom'


class Post extends Component {
    state = {
        post: {},
        redirect: false
    }

    componentWillUpdate(prevProps) {
        if (prevProps.post !== this.state.post) {
            this.setState({
                post: prevProps.post
            })
        }
    }

    onClickPost = (e) => {
        this.setState({
            redirect: true
        })
    }


    render() {
        const { id, title, author, body, category, timestamp, voteScore } = this.props.post

        if (this.state.redirect) {
            return <Redirect to={`/post/${id}/edit`}></Redirect>
        }

        return (
            <div className="content-container hover-card" onClick={this.onClickPost}>
                <nav className="level">
                    {getPostCategoryHeader(category)}
                    <div className="level-right">
                        <div className="level-item">
                            <DateTimeTag dateTime={timestamp} />
                        </div>
                    </div>
                </nav>
                <div className="columns is-mobile is-gapless">
                    <div className="column is-10">
                        <p className="title is-4">{title}</p>
                        <p className="subtitle">{author}</p>
                        <p className="body">{body}</p>
                    </div>
                    <div className="column is-2">
                        <Vote voteScore={voteScore} onVoting={this.onPostVoting} />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ _ }, { post }) {
    return {
        post
    }
}

export default connect(mapStateToProps)(Post)