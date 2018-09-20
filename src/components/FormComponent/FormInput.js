import React from 'react';


const FormInput = (props) => {

    let validationMessage = ''
    

    if(!props.isValid && props.touched){
        validationMessage = props.errorMessages.map((message, i) => {
            console.log(message)
            return <span key={i} className='app-form__validation app-form-row__col--2'> { message} </span>
        })

        console.log(validationMessage);
    }

    let inputButton = '';

    if(props.withButton){
       inputButton = (
            <div className='app-input-button-group' >
                <input  
                    className={'app-form__input ' + ( !props.isValid && props.touched? 'app-form__input--error ' : '')} 
                    {...props.elementConfig} 
                    value={props.value} 
                    onChange={props.onChange} 
                    disabled={props.disabled} />
                <button className='app-btn' onClick={props.onButtonClick} > {props.buttonName} </button>
            </div>
       )
    }else {
        inputButton = (
             <input  
                className={'app-form__input ' + ( !props.isValid && props.touched? 'app-form__input--error ' : '')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.onChange}
                disabled={props.disabled} />
        )
    }

    return(
        <div className={`app-form-row__col app-form-row__col--1x2`}>
            <label  className={`app-form__label app-form__label--right`}> {props.elementConfig.title} </label>
            
            {inputButton}
            { validationMessage }
        </div>
    )
}

export default FormInput;