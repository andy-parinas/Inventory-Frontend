import React  from 'react';


const  AlertMessage = props => {
   
    const messages = props.messages.map((message, i) => {
        return <h3 key={i} className='alert__message' > {message} </h3>
    })

    return (
        <div className='alert-container'>
            <div className={`alert alert--${props.type}`} >
                <div> { messages } </div>
                <a className='alert__button' onClick={props.onDismissed} > X </a>
            </div>
        </div>
       
    )
}

export default AlertMessage;