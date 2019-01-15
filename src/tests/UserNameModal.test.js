import React from "react"
import { UserNameModal } from '../components/UserNameModal'
import { shallow } from 'enzyme'

const props = {
    onCloseModal: jest.fn(),
    openModal: true,
    username: 'vimaciel',
    setAuthor: jest.fn(),
    onSubmitModal: jest.fn()
}

const wrapper = shallow(<UserNameModal {...props} />)

describe('<UserNameModal />', () => {
    it("Test if input gets the value from username props", () => {
        expect(wrapper.find('.input-user-name').props().value).toBe('vimaciel')
    })

    it('Test if modal is open', () => {
        expect(wrapper.exists('.modal.is-active')).toBeTruthy()
    })

    it('Test if modal is close', () => {
        props.openModal = false
        const newWrapper = shallow(<UserNameModal {...props} />)
        expect(newWrapper.find('.modal.is-active').exists()).toBeFalsy()
    })

    it('Test if submit happens with new username', () => {
        const username = 'unknown name'

        wrapper.find('.input-user-name').simulate('change', {
            target: {
                value: username
            }
        })

        wrapper.find('form').simulate('submit', {
            preventDefault: jest.fn()
        })
        expect(props.onSubmitModal).toHaveBeenCalled()
        expect(props.setAuthor).toHaveBeenCalledWith(username)
    })

   
})