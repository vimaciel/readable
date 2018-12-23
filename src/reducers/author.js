import { SET_AUTHOR, GET_AUTHOR } from '../actions/author'

export default function Author(state = {}, action) {
    switch (action.type) {
        case GET_AUTHOR:
        case SET_AUTHOR:
            return {
                ...state,
                username: action.username
            }
        default:            
            return state
    }
}