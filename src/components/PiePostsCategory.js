import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { ResponsivePie } from '@nivo/pie'
import { capitalizeFirstLetter } from '../helpers/common'


class PiePostsCategory extends Component {
    render() {
        return (
            <Fragment>
                <h1 className="graph-title">
                    Posts by category
                </h1>
                <ResponsivePie
                    width={650}
                    height={450}
                    margin={{
                        top: 80,
                        right: 80,
                        bottom: 80,
                        left: 80
                    }}
                    data={this.props.data}
                    innerRadius={0.6}
                    padAngle={0.5}
                    cornerRadius={5}
                    radialLabelsLinkColor="inherit"
                    radialLabelsLinkStrokeWidth={3}
                    radialLabelsTextColor="inherit:darker(1.2)"
                />
            </Fragment>
        );
    }
}

function getData(posts) {
    const data = []

    Object.keys(posts).forEach(key => {
        const { category } = posts[key]
        const post = data.find(p => p.id === category)

        if (post !== null && post !== undefined) {
            post.value += 1
        } else {
            data.push({
                id: category,
                label: capitalizeFirstLetter(category),
                value: 1
            })
        }
    })

    return data

}

function mapStateToProps({ posts }) {
    return {
        data: getData(posts)
    };
}

export default connect(mapStateToProps)(PiePostsCategory)