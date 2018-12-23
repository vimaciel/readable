import { GET_ALL_POSTS, NEW_POST, GET_POSTS_BY_CATEGORY } from '../actions/posts'

export default function Posts(state = {}, action) {
    switch (action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                ...action.posts
            }
        case NEW_POST:
            return {
                ...state,
                [action.post.id]: action.post
            }
        case GET_POSTS_BY_CATEGORY:
            return {
                ...action.posts
            }
        default:
            return state
    }
}