import React from 'react';


const FormSelect = (props) => {

    const options = props.options.map(option => {
        return <option key={option.id} value={option.id} >{ option.name }</option>
    })


    return(
        <div className='app-form-row-element'>
            <label  className={`app-form__label app-form__label--right`}> {props.elementConfig.title} </label>
            <select className='app-form__input' 
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.onChange}
                    disabled={props.disabled} >
                { options }
            </select>

        </div>
    )
}

export default FormSelect;