import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { ResponsiveBar } from '@nivo/bar'
import { Categories } from '../helpers/categoriesApi'


class BarPostsUser extends Component {
    render() {
        return (
            <Fragment>
                <h1 className="graph-title">
                    Posts by User
                </h1>
                <ResponsiveBar
                    width={650}
                    height={450}
                    margin={{
                        top: 80,
                        right: 80,
                        bottom: 80,
                        left: 80
                    }}
                    data={this.props.data}
                    indexBy="username"
                    keys={[
                        'react',
                        'redux',
                        'udacity'
                    ]}
                    padding={0.2}
                    labelTextColor="inherit:darker(1.4)"
                    labelSkipWidth={16}
                    labelSkipHeight={16}
                    groupMode="grouped"
                />
            </Fragment>
        );
    }
}

function getData(posts) {
    let users = []
    let data = []
    Object.keys(posts).forEach(key => {
        const user = users.find(u => u === posts[key].author)
        if (user === undefined) {
            users.push(posts[key].author)
        }
    })

    users.forEach(user => {
        Object.keys(posts)
            .filter(key => posts[key].author === user)
            .forEach(key => {
                const { category } = posts[key]
                const userInfo = data.find(p => p.username === user)
                setUserInfo(data, userInfo, category, user)
            })

    });

    return data
}

function setUserInfo(data, userInfo, category, user) {
    const isNewUserInfo = userInfo === undefined
    
    if (isNewUserInfo) {
        userInfo = {
            username: user,
            react: 0,
            redux: 0,
            udacity: 0
        }
    }

    switch (category) {
        case Categories.react:
            userInfo.react += 1
            break
        case Categories.redux:
            userInfo.redux += 1
            break
        case Categories.udacity:
            userInfo.udacity += 1
            break
        default:
            userInfo.react += 1
    }

    if (isNewUserInfo) {
        data.push(userInfo)
    }
}

function mapStateToProps({ posts }) {
    return {
        data: getData(posts)
    }
}

export default connect(mapStateToProps)(BarPostsUser);