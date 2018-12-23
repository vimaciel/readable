import React, { Component, Fragment } from 'react'
import PostsSlider from './PostsSlider'
import PostsFilter from './PostsFilter';


class Home extends Component {
    render() {
        return (
            <Fragment>
                <PostsSlider />
                <PostsFilter />
            </Fragment>
        )
    }
}

export default Home