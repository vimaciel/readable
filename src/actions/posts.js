import * as postsApi from '../helpers/postsApi'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_POSTS_BY_CATEGORY = 'GET_POST_BY_CATEGORY'
export const UPDATE_POST = 'UPDATE_POST'
export const ADD_POST = 'ADD_POST'

export function getAllPosts(posts) {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}

export function getPostsByCategory(posts) {
    return {
        type: GET_POSTS_BY_CATEGORY,
        posts
    }
}

export function updatePost(post) {
    return {
        type: UPDATE_POST,
        post
    }
}

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export function handleAddPost(post) {
    return (dispatch) => {
        postsApi.addPost(post).then(post => {
            dispatch(addPost(post))
        })
    }
}

export function handleUpdatePost(post) {
    return (dispatch) => {
        postsApi.updatePost(post).then(post => {
            dispatch(updatePost(post))
        })
    }
}

export function handleVotingPost(id, vote) {
    return (dispatch) => {
        postsApi.votingPost(id, vote).then(post => {
            dispatch(updatePost(post))
        })
    }
}

export function handleDeletePost(id) {
    return (dispatch) => {
        postsApi.deletePost(id).then(post => {
            dispatch(updatePost(post))
        })
    }
}


export function handleGetPostsByCategory(category) {
    return (dispatch) => {
        postsApi.postsByCategory(category).then(post => {
            dispatch(getPostsByCategory(post))
        })
    }
}
