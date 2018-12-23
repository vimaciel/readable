import React, { Component } from 'react'
import CategorySelecion from './CategorySelection'
import { connect } from 'react-redux'
import { handleGetPostsByCategory } from '../actions/posts'
import { Categories } from '../helpers/categoriesApi'


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
                <div className="columns">
                    <div className="column is-mobile">
                        <CategorySelecion onCategorySelect={this.onCategorySelect} {...this.state}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(PostsFilter) 