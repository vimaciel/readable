import React, { Component } from 'react'
import CategorySelecion from './CategorySelection'
import { connect } from 'react-redux'
import { Categories } from '../helpers/categoriesApi'
import { OrderBy } from '../helpers/postsApi'
import { handleGetPostsByCategory } from '../actions/posts'
import { setOrderBy } from '../actions/orderPosts'

class PostsFilter extends Component {
    state = {
        itemCategorySelected: Categories.all,
        itemOrderBySelected: OrderBy.newest
    }

    onCategorySelect = (itemCategorySelected) => {
        this.props.dispatch(handleGetPostsByCategory(itemCategorySelected))

        this.setState({
            itemCategorySelected
        })
    }

    onOrderBySelected = (e, itemOrderBySelected) => {
        e.preventDefault()

        this.props.dispatch(setOrderBy(itemOrderBySelected))

        this.setState({
            itemOrderBySelected
        })
    }

    render() {
        const { itemOrderBySelected } = this.state

        return (
            <div className="posts-filter-container">
                <div className="columns is-gapless">
                    <div className="column">
                        <p className="label-selection">Order posts by</p>

                        <div className="tabs is-toggle is-centered">
                            <ul>
                                <li className={itemOrderBySelected === OrderBy.newest ? 'is-active' : ''} onClick={e => this.onOrderBySelected(e, OrderBy.newest)}>
                                    <a href="/">
                                        <span className="icon is-small"><i className="fas fa-calendar" aria-hidden="true"></i></span>
                                        <span>Newest</span>
                                    </a>
                                </li>
                                <li className={itemOrderBySelected === OrderBy.mostVoted ? 'is-active' : ''} onClick={e => this.onOrderBySelected(e, OrderBy.mostVoted)}>
                                    <a href="/">
                                        <span className="icon is-small"><i className="fas fa-caret-up" aria-hidden="true"></i></span>
                                        <span>Most Upvoted</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="column">
                        <p className="label-selection">Select the category</p>
                        <CategorySelecion onCategorySelect={this.onCategorySelect} itemSelected={this.state.itemCategorySelected} />
                    </div>
                </div>
            </div >
        )
    }
}

export default connect()(PostsFilter)
