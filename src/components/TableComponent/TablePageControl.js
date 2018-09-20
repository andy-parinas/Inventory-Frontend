import React, {Component} from 'react';

const TablePageControl = props => {

    const pageOptions = [];

    for(let i = 1; i <= props.pagination.totalPages; i++){
        pageOptions.push(<option key={i} value={i}> {i} </option>)
    }

    return(
        <div className='app-row'>
            <div className='app-page__control'>
                <div className='control-group'>
                    <button className='app-btn' onClick={() => props.onPageChanged(props.pagination.currentPage - 1)} >Prev</button>
                    <button className='app-btn' onClick={() => props.onPageChanged(props.pagination.currentPage + 1)}>Next</button>
                </div>
                <div className='control-group control-group--right'>
                    <span className='app-pagination__page-info' > Page </span>
                    <select className='app-pagination__select' value={props.pagination.currentPage} onChange={(event) => props.onPageChanged(event.target.value)}>
                        {pageOptions}
                    </select>
                    <span className='app-pagination__page-info' > Of {props.pagination.totalPages} </span>
                </div>
            </div>
        </div>
    )

}

export default TablePageControl