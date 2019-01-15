import React from "react"
import { PostHeader } from '../components/PostHeader'
import Delete from '../components/Delete'
import { shallow } from "enzyme"

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

const wrapper = shallow(<PostHeader {...props} />)

describe('<PostHeader/>', () => {
    it('Test if delete button is visible', () => {
        expect(wrapper.find(Delete).exists()).toBeTruthy()
    })

    it('Test if delete button is invisible', () => {
        props.isDeleteVisible = false        
        const newWrapper = shallow(<PostHeader {...props} />)

        expect(newWrapper.find(Delete).exists()).toBeFalsy()
    })
})