import React from 'react';
import PropTypes from 'prop-types';


const ToggleDownIcon = props => {

    return(
        <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-labelledby="title">
            <title>circle-down</title>
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/><path d="M0 0h24v24H0z" fill="none"/>

        </svg>
    )

};


ToggleDownIcon.propTypes = {
    className: PropTypes.string.isRequired
};

export default ToggleDownIcon;