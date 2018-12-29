const url = 'http://localhost:3001'

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token,
    'Content-Type': 'application/json'
}

export const getInicialData = (id) => {
    return Promise.all([
        get('posts'),
        get('categories')
    ]).then(([posts, categories]) => ({
        posts,
        categories
    }))
}

export const get = (resource) => {
    return callServer(resource, 'GET');
}

export const put = (resource, body) => {
    return callServer(resource, 'PUT', body);
}

export const post = (resource, body) => {
    return callServer(resource, 'POST', body);
}

export const del = (resource) => {
    return callServer(resource, 'DELETE');
}

function callServer(resource, method, body = null) {
    let options = {
        method,
        headers
    }

    if (body !== null) {
        options.body = JSON.stringify(body)
    }

    return fetch(`${url}/${resource}`, options).then(res => res.json())
        .then(data => data);
}