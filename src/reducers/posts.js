import { GET_ALL_POSTS, GET_POSTS_BY_CATEGORY, UPDATE_POST, ADD_POST } from '../actions/posts'
import { addNewObjectToState } from '../helpers/common'

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
        case ADD_POST:
            return addNewObjectToState(state, action.post)
        case UPDATE_POST:
            const posts = { ...state }
            Object.keys(posts).forEach(key => {
                if (posts[key].id === action.post.id) {
                    posts[key] = action.post
                }
            })

            return posts
        default:
            return state
    }
}