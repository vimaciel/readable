import React from 'react'
import DateTimeTag from './DateTimeTag'

const PostFooter = (props) => {
    const { timestamp, deleted, commentCount } = props.post
    const { isCard } = props

    return (
        <div style={{ justifyContent: isCard ? 'center' : 'flex-end' }} className="post-footer">
            {deleted && (
                <div className="level-item">
                    <span className="tag fas fa-trash is-danger"></span>
                </div>
            )}
            <div className="level-item">
                <div className="tags has-addons">
                    <span className="tag">Comments</span>
                    <span className="tag is-success">{commentCount}</span>
                </div>
            </div>
            <div className="level-item">
                <DateTimeTag dateTime={timestamp} />
            </div>

        </div>
    );
};

export default PostFooter