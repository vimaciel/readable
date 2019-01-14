import React, { Fragment } from 'react'
import PostsSlider from './PostsSlider'
import PostsFilter from './PostsFilter'
import { withRouter } from "react-router-dom"
import { categoryExists } from '../helpers/categoriesApi'
import NotFound from './NotFound'

const Home = (props) => {
    const pathname = props.location.pathname.replace('/', '')
    const categoryFound = categoryExists(pathname)

    if (!categoryFound) {
        return <NotFound />
    }

    return (
        <Fragment>
            <PostsSlider />
            <PostsFilter />
        </Fragment>
    )
}

export default withRouter(Home)