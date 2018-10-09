import React from 'react';


const FormTextArea = props => {

    let validationMessage = ''
    

    if(!props.isValid && props.touched){
        validationMessage = props.errorMessages.map((message, i) => {
            return <span key={i} className='app-form__validation app-form-row__col--2'> { message} </span>
        })

        console.log(validationMessage);
    }

    return(
        <div className='app-form-row-element-textarea'>
            <label  className={`app-form__label app-form__label--right`}> {props.elementConfig.title} </label>

            <textarea   className='app-form__text-area' 
                        cols={40} rows={5}
                        {...props.elementConfig}
                        disabled={props.disabled}
                        value={props.value} onChange={props.onChange}  />
            { validationMessage }
        </div>
    )
}

export default FormTextArea;