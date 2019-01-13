import React from "react"
import Vote from '../components/Vote'
import { shallow } from 'enzyme'

describe('<Vote />', () => {

    const mockProps = {
        onVoting: jest.fn(),
        voteScore: 10
    }

    it('Calls onVoting function passing upVote as parameter when up button is clicked', () => {
        const wrapper = shallow(<Vote {...mockProps}/>)
        wrapper.find('.fa-caret-up').simulate('click')
        expect(mockProps.onVoting).toHaveBeenCalledWith('upVote')
    })

    it('Check if component renders the vote score', () => {
        const wrapper = shallow(<Vote {...mockProps}/>)
        expect(wrapper.find('.vote-score').text()).toBe(mockProps.voteScore.toString());
    })

    it('Calls onVoting function passing downVote as parameter when down button is clicked', () => {
        const wrapper = shallow(<Vote {...mockProps}/>)
        wrapper.find('.fa-caret-down').simulate('click')
        expect(mockProps.onVoting).toHaveBeenCalledWith('downVote')
    })
})