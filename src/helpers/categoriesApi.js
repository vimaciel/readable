import * as api from './api'

export const Categories = {
    all : '',
    react: 'react',
    redux: 'redux',
    udacity: 'udacity'
}

export const getAllCategories = () => {
    return api.get('categories')
}