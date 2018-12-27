import { GET_ALL_POSTS, GET_POSTS_BY_CATEGORY } from '../actions/posts'

export default function Posts(state = {}, action) {
    switch (action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                ...action.posts
            }
        case GET_POSTS_BY_CATEGORY:
            return {
                ...action.posts
            }
        default:
            return state
    }
}