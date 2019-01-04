import React, { Component } from 'react'
import CategorySelecion from './CategorySelection'
import { connect } from 'react-redux'
import { Categories } from '../helpers/categoriesApi'
import { handleGetPostsByCategory } from '../actions/posts'

class PostsFilter extends Component {
    state = {
        itemSelected: Categories.all
    }

    onCategorySelect = (itemSelected) => {
        this.props.dispatch(handleGetPostsByCategory(itemSelected))

        this.setState({
            itemSelected
        })
    }

    render() {
        return (
            <div className="posts-filter-container">
                <div className="columns is-gapless">
                    <div className="column">
                        <p className="label-selection">Order by</p>

                        <div className="tabs is-toggle is-centered">
                            <ul>
                                <li className="is-active">
                                    <a>
                                        <span className="icon is-small"><i className="fas fa-calendar" aria-hidden="true"></i></span>
                                        <span>Newest</span>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <span className="icon is-small"><i className="fas fa-caret-up" aria-hidden="true"></i></span>
                                        <span>Most Upvoted</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="column">
                        <p className="label-selection">Select the category</p>
                        <CategorySelecion onCategorySelect={this.onCategorySelect} {...this.state} />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(PostsFilter)