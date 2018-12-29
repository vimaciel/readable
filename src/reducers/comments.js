import { GET_COMMENTS, SAVE_COMMENTARY, UPDATE_COMMENTARY } from '../actions/comments'

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
                [action.commentary.id]: action.commentary
            }
        case UPDATE_COMMENTARY:
            const comments = { ...state }
            return Object.keys(comments).map(key => {
                if (comments[key].id === action.commentary.id) {
                    comments[key] = action.commentary
                }

                return comments[key]
            })
        default:
            return state
    }
}