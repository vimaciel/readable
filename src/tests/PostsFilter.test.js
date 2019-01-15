import React from 'react'
import { PostsFilter } from '../components/PostsFilter'
import { shallow } from 'enzyme'
import { OrderBy } from '../helpers/postsApi'
import { Categories } from '../helpers/categoriesApi'

const props = {
    history: [],
    setOrderBy: jest.fn(),
    getPostsByCategory: jest.fn()

}
const wrapper = shallow(<PostsFilter {...props} />)


describe('<PostsFilter/>', () => {
    it('Test if order by newest posts is called', () => {
        const newestLi = wrapper.find('.ulOrderBy > li').at(0)
        newestLi.simulate('click', {
            preventDefault: jest.fn()
        })
        expect(props.setOrderBy).toHaveBeenCalledWith(OrderBy.newest)
    })

    it('Test if order by most voted posts is called', () => {
        const newestLi = wrapper.find('.ulOrderBy > li').at(1)
        newestLi.simulate('click', {
            preventDefault: jest.fn()
        })
        expect(props.setOrderBy).toHaveBeenCalledWith(OrderBy.mostVoted)
    })

    it('Test if when select a category the prop function is called properly', () => {
        wrapper.instance().onCategorySelect(Categories.react)
        expect(props.getPostsByCategory).toHaveBeenCalledWith(Categories.react)
    })
})