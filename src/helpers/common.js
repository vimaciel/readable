import React from 'react'
import ReactIcon from '../images/react.png'
import ReduxIcon from '../images/redux.png'
import UdacityIcon from '../images/udacity.png'


export const formatTimeStamp = (timestamp) => {
    function dataAdjustment(data) {
        if (data <= 9) {
            return `0${data}`
        }

        return data
    }

    const date = new Date(timestamp);
    const month = dataAdjustment(date.getMonth() + 1)
    const day = dataAdjustment(date.getDate())
    const year = date.getFullYear()
    const hour = dataAdjustment(date.getUTCHours())
    const minutes = dataAdjustment(date.getMinutes())

    return {
        date: `${month}/${day}/${year}`,
        time: `${hour}:${minutes}`
    }
}

export const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

export const getPostCategoryHeader = (category = 'react') => {
    const categoryInfo = {
        icon: '',
        alt: '',
        color: 'black'
    }

    switch (category) {
        case 'react':
            categoryInfo.icon = ReactIcon
            categoryInfo.alt = 'ReactIcon'
            categoryInfo.color = '#6ECDED'
            break
        case 'redux':
            categoryInfo.icon = ReduxIcon
            categoryInfo.alt = 'ReduxIcon'
            categoryInfo.color = '#7152A1'
            break
        case 'udacity':
            categoryInfo.icon = UdacityIcon
            categoryInfo.alt = 'UdacityIcon'
            categoryInfo.color = '#1DB1DD'
            break
        default:
            categoryInfo.icon = ReactIcon
            categoryInfo.alt = 'ReactIcon'
            categoryInfo.color = '#6ECDED'
    }

    return (
        <div className="level-left">
            <div className="level-item">
                <figure className="image is-48x48">
                    <img className="is-rounded" alt={categoryInfo.alt} src={categoryInfo.icon} />
                </figure>
            </div>
            <div className="level-item">
                <b style={{ color: categoryInfo.color }}>{capitalizeFirstLetter(category)}</b>
            </div>
        </div>
    )
}

export const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0
}