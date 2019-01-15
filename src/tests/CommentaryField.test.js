import React from 'react'
import { shallow } from 'enzyme'
import { CommentaryField } from '../components/CommentaryField'

const props = {
    post: {
        author: "thingtwo",
        body: "Everyone says so after all.",
        category: "react",
        commentCount: 2,
        deleted: false,
        id: "8xf0y6ziyjabvozdd253nd",
        timestamp: 1467166872634,
        title: "Udacity is the best place to learn React",
        voteScore: 6
    },
    username: 'vimaciel',
    addNewCommentary: jest.fn(),
    onAddNewCommentary: jest.fn()
}

const wrapper = shallow(<CommentaryField {...props} />)

describe('<CommentaryField />', () => {
    it('Test if counter appears', () => {
        wrapper.find('.input.is-large').simulate('change', {
            target: {
                value: "Udacity's react nanodegree is great"
            }
        });

        expect(wrapper.find('.control.commentary-counter').exists()).toBeTruthy()
    })

    it('Test if new commentary is added', () => {
        wrapper.find('.input.is-large').simulate('keypress', {
            key: 'Enter',
            preventDefault: jest.fn()
        })

        expect(props.addNewCommentary).toHaveBeenCalled()
        expect(props.onAddNewCommentary).toHaveBeenCalled()
    })

    it("Test if state openModalUserName is true when there isn't usename", () => {
        props.username = ''
        const newWrapper = shallow(<CommentaryField {...props} />)
        newWrapper.find('.input.is-large').simulate('keypress', {
            key: 'Enter',
            preventDefault: jest.fn()
        })
        
        expect(newWrapper.state().openModalUserName).toBeTruthy()
    })
})