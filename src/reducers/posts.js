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
            const key = parseInt(Object.keys(state).find(key => state[key].id === action.post.id))
            const { body, category, commentCount, deleted, title, voteScore } = action.post

            return {
                ...state,
                [key]: {
                    ...state[key],
                    body, category, commentCount, deleted, title, voteScore
                }
            }

        default:
            return state
    }
}