export const SET_ORDER_BY = 'SET_ORDER_BY'

export function setOrderBy(orderBy) {
    return {
        type: SET_ORDER_BY,
        orderBy
    }
}