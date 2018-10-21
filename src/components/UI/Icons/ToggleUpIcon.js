import React from 'react';
import PropTypes from 'prop-types';


const ToggleUpIcon = props => {

    return(
        <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-labelledby="title">
           <title>circle-up</title>
           <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/><path d="M0 0h24v24H0z" fill="none"/>

        </svg>
    )

};


ToggleUpIcon.propTypes = {
    className: PropTypes.string.isRequired
};

export default ToggleUpIcon;