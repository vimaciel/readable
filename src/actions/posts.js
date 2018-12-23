import * as postsApi from '../helpers/postsApi'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const NEW_POST = 'NEW_POST'
export const GET_POSTS_BY_CATEGORY = 'GET_POST_BY_CATEGORY'

export function getAllPosts(posts) {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}

export function newPost(post) {
    return {
        type: NEW_POST,
        post
    }
}

export function getPostsByCategory(posts) {
    return {
        type: GET_POSTS_BY_CATEGORY,
        posts
    }
}

export function handleGetAllPosts() {
    return (dispatch) => {
        postsApi.getAllPosts().then(posts => {
            dispatch(getAllPosts(posts))
        })
    }
}


export function handleNewPost(post) {
    return (dispatch) => {
        postsApi.newPost(post).then(post => {
            dispatch(newPost(post))
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