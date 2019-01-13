import React from "react"
import { store } from './Store'
import { createConnectedComponent } from './Helper'
import PostHeader from '../components/PostHeader'
import Delete from '../components/Delete'

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
    isDeleteVisible: true
}

const state = {

}

const wrapper = createConnectedComponent(<PostHeader {...props} />, store(state))

describe('<PostHeader/>', () => {
    it('Test if delete button is visible', () => {
        expect(wrapper.find(Delete).exists()).toBeTruthy()
    })

    it('Test if delete button is invisible', () => {
        const newProp = {
            ...props,
            isDeleteVisible: false
        }
        const newWrapper = createConnectedComponent(<PostHeader {...newProp} />, store(state))

        expect(newWrapper.find(Delete).exists()).toBeFalsy()
    })
})