import { GET_ALL_CATEGORIES } from '../actions/categories'
import { capitalizeFirstLetter } from "../helpers/common";

export default function categories(state = {}, action) {
    switch (action.type) {
        case GET_ALL_CATEGORIES:
            // Removing unnecessary nested node 
            const categories = action.categories.categories

            const items = Object.keys(categories).map(key => {
                categories[key].name = capitalizeFirstLetter(categories[key].name)
                return categories[key]
            })

            return {
                ...state,
                ...items
            }      
        default:
            return state
    }
}