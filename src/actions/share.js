import { handleGetAuthor } from './author'
import { getAllCategories } from '../helpers/categoriesApi'
import * as categoriesAction from '../actions/categories'

export function handleInitialData() {
    return (dispatch) => {
        return getAllCategories()
            .then(categories => {
                dispatch(categoriesAction.getAllCategories(categories))
                dispatch(handleGetAuthor())
            })
    }
}