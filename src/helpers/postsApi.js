import * as service from '../helpers/api'
import * as uuid from 'uuid'

export const savePost = (post) => {
    if (post.id !== null) {
        service.put(`posts/${post.id}`, post)
        return
    }

    post.timestamp = Date.now()
    post.id = uuid.v1()
    service.post('posts', post);
}

export const deletePost = (id) => {
    return service.del(`posts/${id}`)
}

export const postsByCategory = (category) => {
    category = category.toLowerCase()

    if (category === '') {
        return service.get('posts')
    }

    return service.get(`${category}/posts`)
}

export const getAllPosts = () => {
    return service.get('posts')
}

export const votingPost = (id, vote) => {
    const body = {
        option: vote
    }

    return service.post(`posts/${id}`, body)
}

export const getPost = (id) => {
    return service.get(`posts/${id}`)
}

export const getPostDetailInicialData = (id) => {
    return Promise.all([
        getPost(id),
        service.get(`posts/${id}/comments`)
    ]).then(([post, comments]) => ({
        post,
        comments
    }))
}