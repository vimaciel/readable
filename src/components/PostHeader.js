import React from 'react'
import DateTimeTag from './DateTimeTag'
import { capitalizeFirstLetter, getPostCategoryHeader } from '../helpers/common'

const PostHeader = (props) => {
    const { category, timestamp, deleted } = props.post
    const categoryInfo = getPostCategoryHeader(category)

    return (
        <nav className="level" onClick={props.onClickPostHeader !== null && props.onClickPostHeader}>
            <div className="level-left">
                <div className="level-item">
                    <figure className="image is-48x48">
                        <img className="is-rounded" alt={categoryInfo.alt} src={categoryInfo.icon} />
                    </figure>
                </div>
                <div className="level-item">
                    <b style={{ color: categoryInfo.color }}>{capitalizeFirstLetter(category)}</b>
                </div>
            </div>
            <div className="level-right">
                {deleted && (
                    <div className="level-item">
                        <div className="tags has-addons">
                            <span className="tag">Deleted</span>
                            <span className="tag fas fa-trash is-danger"></span>
                        </div>
                    </div>
                )}
                <div className="level-item">
                    <DateTimeTag dateTime={timestamp} />
                </div>
            </div>
        </nav>
    );
};

export default PostHeader