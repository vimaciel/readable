import { handleGetAuthor } from './author'
import { getAllCategories } from '../helpers/categoriesApi'
import { getPostDetailInicialData } from '../helpers/postsApi'
import * as categoriesAction from '../actions/categories'
import * as postsAction from '../actions/posts'
import * as commentsAction from '../actions/comments'

export function handleInitialData() {
    return (dispatch) => {
        return getAllCategories()
            .then(categories => {
                dispatch(categoriesAction.getAllCategories(categories))
                dispatch(handleGetAuthor())
            })
    }
}

export function handlePostDetailInitialData(postId) {
    return (dispatch) => {
        return getPostDetailInicialData(postId)
            .then(({ post, comments }) => {
                dispatch(postsAction.getPost(post))
                dispatch(commentsAction.getComments(comments))
            })
    }
}