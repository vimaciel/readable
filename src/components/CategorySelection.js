import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Categories } from '../helpers/categoriesApi'
import { capitalizeFirstLetter } from "../helpers/common"

class CategorySelection extends Component {   
    onSelect = (e) => {
        e.preventDefault()
        const itemSelected = e.target.dataset.path
        this.props.onCategorySelect(itemSelected)
    }

    render() {
        let { categories, hasAllItem, smallControl } = this.props
        let controlClass = "tabs is-toggle is-centered"

        if (smallControl) {
            controlClass = `${controlClass} is-small`
        }

        return (
            <div className={controlClass}>
                <ul>
                    {hasAllItem && <li key='all' className={this.props.itemSelected === Categories.all ? 'is-active' : ''}><a href='/' onClick={this.onSelect} data-path=''>All</a></li>}
                    {Object.keys(categories).map(key => (
                        <li key={key} className={categories[key].path === this.props.itemSelected ? 'is-active' : ''}>
                            <a href="/" data-path={categories[key].path} onClick={this.onSelect}>{capitalizeFirstLetter(categories[key].name)}</a>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ categories }, { itemSelected = Categories.all, hasAllItem = true, smallControl = false }) {
    return {
        categories,
        itemSelected,
        hasAllItem,
        smallControl
    }
}

export default connect(mapStateToProps)(CategorySelection)