import React  from 'react';


const  AlertMessage = props => {
   
    let messages = '';
    props.messages.map((message, i) => {
        messages += ( message + ' | ' );
    })

    return (
            <div className={`alert alert--${props.type}`} >
                <div> <h3 className='alert__message' > {messages} </h3></div>
                <a className='alert__button' onClick={props.onDismissed} > [ Close Alert ] </a>
            </div>
       
    )
}

export default AlertMessage;