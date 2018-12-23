export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export function getAllCategories(categories) {
    return {
        type: GET_ALL_CATEGORIES,
        categories
    }
}