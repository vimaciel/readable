import { GET_COMMENTS, SAVE_COMMENTARY, UPDATE_COMMENTARY } from '../actions/comments'
import { addNewObjectToState } from '../helpers/common'

export default function categories(state = {}, action) {
    switch (action.type) {
        case GET_COMMENTS:
            return action.comments
        case SAVE_COMMENTARY:
            return addNewObjectToState(state, action.commentary)
        case UPDATE_COMMENTARY:
            const comments = { ...state }
            Object.keys(comments).forEach(key => {
                if (comments[key].id === action.commentary.id) {
                    comments[key] = action.commentary
                }
            })

            return comments
        default:
            return state
    }
}