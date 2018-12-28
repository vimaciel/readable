import { GET_COMMENTS, SAVE_COMMENTARY } from '../actions/comments'

export default function categories(state = {}, action) {
    switch (action.type) {
        case GET_COMMENTS:
            return {
                ...state,
                ...action.comments
            }
        case SAVE_COMMENTARY:
            return {
                ...state,
                [action.commentary.id]: { ...action.commentary }
            }
        default:
            return state
    }
}