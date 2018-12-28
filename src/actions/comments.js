import * as commentsApi from "../helpers/commentsApi";

export const GET_COMMENTS = 'GET_COMMENTS';
export const SAVE_COMMENTARY = 'SAVE_COMMENTARY';

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

export function handleSaveCommentary(commentary) {
    return (dispatch) => {
        commentsApi.newCommentary(commentary).then(newCommentary => {
            console.log(newCommentary)
            dispatch(saveCommentary(newCommentary))
        })
    }
}