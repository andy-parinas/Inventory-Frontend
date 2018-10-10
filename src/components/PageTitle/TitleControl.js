import React from 'react';


const TitleControl = props => {

    const controls = props.buttons.map((control, i) => {
        return <button key={i} className='app-btn' onClick={control.action} >{ control.name }</button>
    })
    
    return(
        
        <div className='app-page__control app-page__control--3x2' >
                <div className='control-group' >
                    <h2>{props.title} 
                        <small> {props.action} </small>
                    </h2>
                </div>
                <div className='control-group control-group--right'>
                    { controls }
                </div>
        </div>
    )
}

export default TitleControl;