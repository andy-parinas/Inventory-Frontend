import React  from 'react';


const  AllertMessage = props => {
   
    const messages = props.messages.map((message, i) => {
        return <h3 key={i} className='allert__message' > {message} </h3>
    })

    return (
        <div className={`allert allert--${props.type}`} >
        <div>
            { messages }
        </div>
        <a className='allert__button' onClick={props.onDismissed} > X </a>
        </div>
    )
}

export default AllertMessage;