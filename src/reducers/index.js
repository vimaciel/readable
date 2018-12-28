import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import author from './author'
import comments from './comments'

export default combineReducers({
    author,
    categories,
    posts,
    comments
})