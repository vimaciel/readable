import React, { Component, Fragment } from 'react'
import { handleVotingCommentary, handleGetComments } from "../actions/comments"
import { connect } from 'react-redux'
import Commentary from "./Commentary"
import Post from './Post'
import { isObjectEmpty } from '../helpers/common'
import CommentaryField from './CommentaryField'


class PostDetail extends Component {    
    componentDidMount() {
        const { post, dispatch } = this.props
        post !== null && dispatch(handleGetComments(post.id))
    }

    onCommentaryVoting = (id, vote) => {
        this.props.dispatch(handleVotingCommentary(id, vote))
    }   

    render() {
        const { post, comments, username } = this.props

        const detailPostClass = `column ${isObjectEmpty(comments) ? 'is-full' : 'is-three-fifths'}`

        return (
            <Fragment>
                <div className="columns">
                    <div className={detailPostClass}>
                        <Post post={post} />
                        <CommentaryField post={post} username={username}/>
                    </div>
                    <div className="column">
                        {Object.keys(comments).map(key => (
                            <Commentary key={key} commentary={comments[key]} onCommentaryVoting={this.onCommentaryVoting} />
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
        comments
    }
}

export default connect(mapStateToProps)(PostDetail)


