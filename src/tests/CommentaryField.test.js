import React from 'react'
import { store } from './Store'
import { createConnectedComponent } from './Helper'
import CommentaryField from '../components/CommentaryField'

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
    }
}

const state = {
    author: {
        username: 'vimaciel'
    }
}

const wrapper = createConnectedComponent(<CommentaryField {...props} />, store(state))

describe('<CommentaryField />', () => {
    it('Test if counter appears', () => {
        wrapper.find('.input.is-large').simulate('change', {
            target: {
                value: "Udacity's react nanodegree is great"
            }
        });

        expect(wrapper.find('.control.commentary-counter').exists()).toBe(true)

    })
})