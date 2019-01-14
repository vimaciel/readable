import * as api from './api'

export const Categories = {
    all: '',
    react: 'react',
    redux: 'redux',
    udacity: 'udacity'
}

export const getAllCategories = () => {
    return api.get('categories')
}

export const categoryExists = (category) => {
    return Object.keys(Categories).find(key => Categories[key] === category.toLowerCase()) !== undefined
}