import React from 'react'
import { capitalizeFirstLetter, getPostCategoryHeader } from '../helpers/common'

const PostHeader = (props) => {
    const { category } = props.post
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
        </nav>
    );
};

export default PostHeader