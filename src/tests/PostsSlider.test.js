import { mapStateToProps } from '../components/PostsSlider'

const state = {
    posts: {
        0: {
            category: 'react',
            timestamp: 1467166872634,
            voteScore: 6
        },
        1: {
            category: 'redux',
            timestamp: 1468479767190,
            voteScore: -5
        }
    },
    orderPosts: {
        orderBy: "newest"
    }
}

const props = {
    location: {
        pathname: '/'
    }
}

describe('<PostsSlider>', () => {
    it("Test if posts is ordering by newest post", () => {
        expect(mapStateToProps(state, props).postIds).toEqual(["1", "0"])
    })

    it("Test if posts is ordering by mostVoted post", () => {
        state.orderPosts.orderBy = "mostVoted"
        expect(mapStateToProps(state, props).postIds).toEqual(["0", "1"])
    })

    it("Test if category filter is happening", () => {
        props.location.pathname = '/react'
        expect(mapStateToProps(state, props).postIds).toEqual(["0"])
    })
})