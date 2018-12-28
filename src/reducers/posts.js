import { GET_ALL_POSTS, GET_POSTS_BY_CATEGORY, GET_POST, UPDATE_POST } from '../actions/posts'

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
        case GET_POST:
        case UPDATE_POST:
            return {
                ...state,
                [action.post.id]: action.post
            }      
        default:
            return state
    }
}