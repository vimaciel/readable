export const GET_COMMENTS = 'GET_COMMENTS';

export function getComments(postId) {
    return {
        type: GET_COMMENTS_POST,
        postId
    }
}

// export function handleGetComments(postId) {

// }