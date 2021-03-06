import React, { Component } from "react"
import Slider from "react-slick"
import NewPostCard from './NewPostCard'
import { connect } from 'react-redux'
import ArrowSlider from './ArrowSlider'
import PostCard from "./PostCard"
import { OrderBy } from '../helpers/postsApi'
import { withRouter } from "react-router-dom"

class PostsSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            nextArrow: <ArrowSlider orientation="next" />,
            prevArrow: <ArrowSlider orientation="prev" />,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2,
                        arrows: false
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                }
            ]
        };


        return (
            <Slider {...settings} className="posts-slider">
                <NewPostCard></NewPostCard>
                {this.props.postIds.map(id => (
                    <PostCard key={id} id={id} isCardSlider={true} />
                ))}
            </Slider>
        );
    }
}

export function mapStateToProps({ posts, orderPosts }, props) {
    const pathname = props.location.pathname.replace('/', '')
    const { orderBy = OrderBy.newest } = orderPosts
    return {
        postIds: Object.keys(posts).filter(key => {
            if (pathname !== '') {
                return posts[key].category === pathname
            }

            return true
        }).sort((a, b) => {
            if (orderBy === OrderBy.newest) {
                return posts[b].timestamp - posts[a].timestamp
            }

            return posts[b].voteScore - posts[a].voteScore
        }),
    }
}

export default withRouter(connect(mapStateToProps)(PostsSlider))