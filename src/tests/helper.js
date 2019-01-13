import React from "react"
import { mount } from 'enzyme'
import { Provider } from 'react-redux'

export function createConnectedComponent(component, store) {
    return mount(
        <Provider store={store}>
            {component}
        </Provider>
    )
}