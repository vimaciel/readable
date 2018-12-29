import * as commentsApi from "../helpers/commentsApi";

export const GET_COMMENTS = 'GET_COMMENTS';
export const SAVE_COMMENTARY = 'SAVE_COMMENTARY';
export const UPDATE_COMMENTARY = 'UPDATE_COMMENTARY';

export function getComments(comments) {
    return {
        type: GET_COMMENTS,
        comments
    }
}

export function saveCommentary(commentary) {
    return {
        type: SAVE_COMMENTARY,
        commentary
    }
}

export function updateCommentary(commentary) {
    return {
        type: UPDATE_COMMENTARY,
        commentary
    }
}

export function handleSaveCommentary(commentary) {
    return (dispatch) => {
        commentsApi.newCommentary(commentary).then(newCommentary => {
            console.log(newCommentary)
            dispatch(saveCommentary(newCommentary))
        })
    }
}

export function handleVotingCommentary(id, vote) {
    return (dispatch) => {
        commentsApi.votingCommentary(id, vote).then(commentary => {
            dispatch(updateCommentary(commentary))
        })
    }
}