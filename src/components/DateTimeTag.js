import React from 'react'
import { formatTimeStamp } from "../helpers/common"

const DateTimeTag = (props) => {
    
    const {date, time} = formatTimeStamp(props.dateTime)    

    return (
        <div className="tags has-addons">
            <span className="tag">{date}</span>
            <span className="tag is-info">{time}</span>
        </div>
    );
};

export default DateTimeTag