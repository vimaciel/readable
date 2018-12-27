import * as cookie from 'js-cookie'

export const setAuthor = (username) => {
    cookie.set('username', username)
}

export const getAuthor = () => {
    return cookie.get('username')
}

