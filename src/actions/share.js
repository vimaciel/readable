import { handleGetAuthor } from './author'
import { getInicialData } from '../helpers/api'
import * as categoriesAction from '../actions/categories'
import * as postsAction from '../actions/posts'

export function handleInitialData() {
    return (dispatch) => {
        return getInicialData()
            .then(({ posts, categories }) => {
                dispatch(postsAction.getAllPosts(posts))
                dispatch(categoriesAction.getAllCategories(categories))
                dispatch(handleGetAuthor())
            })
    }
}