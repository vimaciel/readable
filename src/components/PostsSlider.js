import React, { Component } from "react"
import Slider from "react-slick"
import NewPostCard from './NewPostCard'
import PostCard from './PostCard';
import { handleGetAllPosts } from "../actions/posts";
import { connect } from 'react-redux'

class PostsSlider extends Component {
    componentDidMount() {
        this.props.dispatch(handleGetAllPosts())
        console.log('componentDidMount')
    }

    render() {
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
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
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <Slider {...settings} className="posts-slider">
                <NewPostCard></NewPostCard>
                {this.props.postIds.map(id => (
                    <PostCard key={id} id={id} />
                ))}
            </Slider>
        );
    }
}

function mapStateToProps({ posts }) {
    return {
        postIds: Object.keys(posts).sort((a, b) => posts[b].timestamp - posts[a].timestamp)
    }
}

export default connect(mapStateToProps)(PostsSlider)