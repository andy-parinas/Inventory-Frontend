import React from 'react';
import PropTypes from 'prop-types';


const ArrowRightIcon = props => {

    return(
        <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-labelledby="title">
            <title>arrow-right</title>
            <path d="M31 16l-15-15v9h-16v12h16v9z"></path>

        </svg>
    )

};


ArrowRightIcon.propTypes = {
    className: PropTypes.string.isRequired
};

export default ArrowRightIcon;