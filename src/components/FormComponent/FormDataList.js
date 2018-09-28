import React from 'react';

const FormDataList = (props) => {

    const listOptions = props.options.map(option => {
        return <option key={option} value={option} />
    })

    let validationMessage = ''

    if(!props.isValid && props.touched){
        validationMessage = props.errorMessages.map((message, i) => {
            return <span key={i} className='app-form__validation app-form-row__col--2'> { message} </span>
        })
    }

    return(
        <div className='app-form-row-element'>
            <label  className={`app-form__label app-form__label--right`}> {props.elementConfig.title} </label>
            <input  
                className={'app-form__input ' + ( !props.isValid && props.touched? 'app-form__input--error' : '') } 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.onChange}
                disabled={props.disabled} />
            <div className='app-form-row-element__validation'>
                { validationMessage }
            </div>           
            <datalist id={props.elementConfig.name} >
                {listOptions}
            </datalist>
        </div>
    )

}

export default FormDataList;