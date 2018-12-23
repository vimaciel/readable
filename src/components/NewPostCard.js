import React from 'react'
import AddIcon from '../images/add.png'

const CardNewPost = () => {
    return (
        <div className="card flex-column-items-center">
            <a className="clickble-area" href="/post/new">
                <figure className="image is-128x128">
                    <img className="is-rounded" alt="AddIcon" src={AddIcon} />
                </figure>
                <p className="title">New Post</p>
            </a>
        </div>
    )
}

export default CardNewPost