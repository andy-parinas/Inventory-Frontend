import React from 'react';
import PropTypes from 'prop-types';


const ArrowLeftIcon = props => {

    return(
        <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-labelledby="title">
            <title>arrow-left</title>
            <path d="M1 16l15 15v-9h16v-12h-16v-9z"></path>

        </svg>
    )

};


ArrowLeftIcon.propTypes = {
    className: PropTypes.string.isRequired
};

export default ArrowLeftIcon;