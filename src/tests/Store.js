import { createStore, applyMiddleware } from "redux"
import reducer from "../reducers"
import thunk from 'redux-thunk'

export let spyDispatch

const logger = (store) => (next) => (action) => {
    spyDispatch = action
}

const middleware = applyMiddleware(thunk, logger)

export const store = state => createStore(reducer, state, middleware)
