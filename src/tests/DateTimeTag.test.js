import React from 'react'
import DateTimeTag from "../components/DateTimeTag"
import { shallow } from 'enzyme'
import { formatTimeStamp } from "../helpers/common"

const props = {
    dateTime: Date.now()
}

const { date, time } = formatTimeStamp(props.dateTime)

const wrapper = shallow(<DateTimeTag {...props} />)

describe('<DateTimeTag />', () => {
    it('Verify date format', () => {
        expect(wrapper.find('.tag').at(0).text()).toBe(date)
        expect(wrapper.find('.tag.is-info').at(0).text()).toBe(time)
    })
})