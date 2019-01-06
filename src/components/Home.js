import React, { Fragment } from 'react'
import PostsSlider from './PostsSlider'
import PostsFilter from './PostsFilter';

const Home = () => {
    return (
        <Fragment>
            <PostsSlider />
            <PostsFilter />
        </Fragment>
    )
}

export default Home