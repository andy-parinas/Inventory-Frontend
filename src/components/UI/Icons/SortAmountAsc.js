import React from 'react';
import PropTypes from 'prop-types';


const SortAmountAsc = props => {

    return(
        <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-labelledby="title">
            <title>sort-amount-asc</title>
            <path d="M10 24v-24h-4v24h-5l7 7 7-7h-5z"></path>
            <path d="M14 18h18v4h-18v-4z"></path>
            <path d="M14 12h14v4h-14v-4z"></path>
            <path d="M14 6h10v4h-10v-4z"></path>
            <path d="M14 0h6v4h-6v-4z"></path>
        </svg>
    )

};


SortAmountAsc.propTypes = {
    className: PropTypes.string.isRequired
};

export default SortAmountAsc;