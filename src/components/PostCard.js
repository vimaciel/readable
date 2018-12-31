import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostHeader from './PostHeader'
import { Redirect } from "react-router-dom"
import PostFooter from './PostFooter'
import Vote from './Vote'

class PostCard extends Component {
    state = {
        redirect: false
    }

    onCardClick = (e) => {
        e.preventDefault();

        this.setState({
            redirect: true
        })
    }

    render() {
        const { id, title, body, author, voteScore, category } = this.props.post

        if (this.state.redirect) {
            return <Redirect push to={`/${category}/${id}`} />
        }

        return (
            <a href="/" onClick={this.onCardClick}>
                <div className="hover-card card">
                    <header>
                        <PostHeader post={this.props.post} onClickPostHeader={this.onCardClick} />
                    </header>

                    <div className="card-content">
                        <div className="columns is-mobile is-gapless">
                            <div className="column is-10">
                                <p className="title">{title}</p>
                                <p className="author">{author}</p>
                                <p className="body">"{body}"</p>
                            </div>
                            <div className="column is-2">
                                <Vote isSmallVote={true} voteScore={voteScore}/>
                            </div>
                        </div>
                    </div>

                    <PostFooter post={this.props.post} isCard={true} />
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