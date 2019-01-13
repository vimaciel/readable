import React from "react"
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

export function createConnectedComponent(component, store) {
    return mount(
        <Provider store={store}>
            <Router>
                {component}
            </Router>
        </Provider>
    )
}