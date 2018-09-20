import React from 'react';


const InventoryTitleControl = (props) => {

    const controls = props.buttons.map((control, i) => {
        return <button key={i} className='app-btn' onClick={control.action} >{ control.name }</button>
    })
    
    return(
        
        <div className='app-page__control app-page__control--3x2' >
                <div className='control-group' >
                    <h3>{props.title} 
                        <small> {props.edit? '-- Edit' : props.delete? '-- Delete' : ''} </small>
                    </h3>
                </div>
                <div className='control-group control-group--right'>
                    { props.showButton? controls : '' }
                </div>
        </div>
    )
}


export default InventoryTitleControl;