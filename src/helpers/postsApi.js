import * as service from '../helpers/api'
import * as uuid from 'uuid'

export const newPost = (post) => {
    post.timestamp = Date.now()    
    post.id = uuid.v1()
    return service.post('posts', post);
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