import React from 'react'
import PiePostsCategory from "./PiePostsCategory"
import BarPostsUser from "./BarPostsUser"

const PostsReport = () => {
    return (
        <div className="columns" style={{ height: 1000 }}>
            <div className="column">
                <PiePostsCategory />
            </div>
            <div className="column">
                <BarPostsUser />
            </div>
        </div>
    );
};

export default PostsReport;