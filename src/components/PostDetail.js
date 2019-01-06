import React, { Component, Fragment } from 'react'
import { handleVotingCommentary, handleGetComments } from "../actions/comments"
import { connect } from 'react-redux'
import Commentary from "./Commentary"
import Post from './Post'
import { isObjectEmpty } from '../helpers/common'
import CommentaryField from './CommentaryField'
import NotFound from './NotFound'


class PostDetail extends Component {
    componentDidMount() {
        const { dispatch, postId } = this.props
        dispatch(handleGetComments(postId))
    }

    onCommentaryVoting = (id, vote) => {
        this.props.dispatch(handleVotingCommentary(id, vote))
    }

    render() {
        const { post, comments, commentaryIds, username } = this.props

        if (this.props.post === null || this.props.post.deleted) {
            return <NotFound />
        }

        const detailPostClass = `column ${isObjectEmpty(comments) ? 'is-full' : 'is-three-fifths'}`

        return (
            <Fragment>
                <div className="columns">
                    <div className={detailPostClass}>
                        <Post post={post} />
                        <CommentaryField post={post} username={username} />
                    </div>
                    <div className="column">
                        {commentaryIds.map(id => (
                            <Commentary key={id} commentary={comments[id]} onCommentaryVoting={this.onCommentaryVoting} />
                        ))}
                    </div>
                </div>

            </Fragment>
        );
    }
}

function mapStateToProps({ posts, author, comments }, props) {
    const postId = props.match.params.post_id
    const key = Object.keys(posts).find(key => posts[key].id === postId)
    const post = key ? posts[key] : null

    return {
        post,
        username: author.username,
        commentaryIds: Object.keys(comments).sort((a, b) => comments[b].timestamp - comments[a].timestamp),
        comments,
        postId
    }
}

export default connect(mapStateToProps)(PostDetail)


