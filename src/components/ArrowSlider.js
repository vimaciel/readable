import React from 'react';

const ArrowSlider = (props) => {
    const { onClick, orientation } = props
    const arrowStyle = orientation === 'next' ? 'slick-arrow-right' : 'slick-arrow-left'
    const icon = orientation == 'next' ? 'fa-angle-right' : 'fa-angle-left'
    
    return (
        <div className={arrowStyle}>
            <button className="button is-large" onClick={onClick}>
                <span className="icon is-medium">
                    <i className={`fas ${icon} fa-2x`}></i>
                </span>
            </button>
        </div>
    );
};

export default ArrowSlider;