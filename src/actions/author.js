import * as authorApi from '../helpers/authorApi'

export const SET_AUTHOR = 'SET_AUTHOR'
export const GET_AUTHOR = 'GET_AUTHOR'

export function setAuthor(username) {
    return {
        type: SET_AUTHOR,
        username
    }
}

export function getAuthor(username) {
    return {
        type: GET_AUTHOR,
        username
    }
}

export function handleSetAuthor(username) {
    return (dispatch) => {
        authorApi.setAuthor(username)
        dispatch(setAuthor(username))
    }
}

export function handleGetAuthor() {
    return (dispatch) => {
        const username = authorApi.getAuthor()
        dispatch(getAuthor(username))
    }
}