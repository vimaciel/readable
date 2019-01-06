import { SET_ORDER_BY } from '../actions/orderPosts'

export default function OrderPosts(state = {}, action) {
    switch (action.type) {
        case SET_ORDER_BY:
            const { orderBy } = action
            return {
                ...state,
                orderBy
            }
        default:
            return state
    }
}