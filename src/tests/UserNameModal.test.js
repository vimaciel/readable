import React from "react"
import UserNameModal from '../components/UserNameModal'
import { createConnectedComponent } from './Helper'
import { store, spyDispatch } from "./Store"

const state = {
    author: {
        username: 'vimaciel',
    }
}

const props = {
    onCloseModal: jest.fn(),
    openModal: true
}

const wrapper = createConnectedComponent(<UserNameModal {...props} />, store(state))

describe('<UserNameModal />', () => {
    it("Test if input gets the value from username's store", () => {
        expect(wrapper.find('.input-user-name').props().value).toBe('vimaciel')
    })

    it('Test if modal is open', () => {
        expect(wrapper.exists('.modal.is-active')).toBeTruthy()
    })

    it('Test if modal is close', () => {
        props.openModal = false
        const newWrapper = createConnectedComponent(<UserNameModal {...props} />, store(state))
        expect(newWrapper.find('.modal.is-active').exists()).toBeFalsy()
    })

    it('Test if store is updated when submit is fired with a new input', () => {
        const username = 'unknown name'

        wrapper.find('.input-user-name').simulate('change', {
            target: {
                value: username
            }
        });

        wrapper.find('form').simulate('submit')
        expect(spyDispatch.username).toBe(username)
    })
})