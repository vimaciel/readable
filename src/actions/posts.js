import * as postsApi from '../helpers/postsApi'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_POST = 'GET_POST'
export const GET_POSTS_BY_CATEGORY = 'GET_POST_BY_CATEGORY'
export const UPDATE_POST = 'UPDATE_POST'

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

export function getPost(post) {
    return {
        type: GET_POST,
        post
    }
}

export function updatePost(post) {
    return {
        type: UPDATE_POST,
        post
    }
}

export function handleGetAllPosts() {
    return (dispatch) => {
        postsApi.getAllPosts().then(posts => {
            dispatch(getAllPosts(posts))
        })
    }
}


export function handleGetPostsByCategory(category) {
    return (dispatch) => {
        postsApi.postsByCategory(category).then(posts => {            
            dispatch(getPostsByCategory(posts))
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

export function handleGetPost(id) {
    return (dispatch) => {
        postsApi.getPost(id).then(post => {
            dispatch(getPost(post))
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
