import React from 'react'
import AddIcon from '../images/add.png'

const CardNewPost = () => {
    return (
        <a href="/post/new">
            <div className="hover-card new-post-card card flex-column-items-center">
                <figure className="image is-128x128">
                    <img className="is-rounded" alt="AddIcon" src={AddIcon} />
                </figure>
                <p className="title">New Post</p>
            </div>
        </a>
    )
}

export default CardNewPost