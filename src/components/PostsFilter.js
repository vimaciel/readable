import React, { Component } from 'react'
import CategorySelecion from './CategorySelection'
import { connect } from 'react-redux'
import { Categories } from '../helpers/categoriesApi'
import { OrderBy } from '../helpers/postsApi'
import { handleGetPostsByCategory } from '../actions/posts'
import { setOrderBy } from '../actions/orderPosts'
import { withRouter } from 'react-router-dom'

export class PostsFilter extends Component {
    state = {
        itemCategorySelected: this.props.itemCategorySelected,
        itemOrderBySelected: OrderBy.newest
    }

    onCategorySelect = (itemCategorySelected) => {
        this.props.getPostsByCategory(itemCategorySelected)

        this.setState({
            itemCategorySelected
        })
        
        this.props.history.push(itemCategorySelected !== Categories.all ? `/${itemCategorySelected}` : '/')
    }

    onOrderBySelected = (e, itemOrderBySelected) => {
        e.preventDefault()

        this.props.setOrderBy(itemOrderBySelected)

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
                            <ul className="ulOrderBy">
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
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPostsByCategory: (category) => {
            dispatch(handleGetPostsByCategory(category))
        },

        setOrderBy: (itemOrderBySelected) => {
            dispatch(setOrderBy(itemOrderBySelected))
        }
    }
}

function mapStateToProps(_, props) {
    const pathname = props.location.pathname.replace('/', '')
    return {
        itemCategorySelected: pathname === '' ? Categories.all : pathname
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsFilter))
