import React from 'react';


const PageTitle = (props) => {

    return(
        <div className='page-title' >
            { props.children }
            <h1> { props.title } </h1>
        </div>
    )
}

export default PageTitle;