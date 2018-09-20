import React from 'react';


const FormSelect = (props) => {

    const options = props.options.map(option => {
        return <option key={option} value={option} >{ option }</option>
    })


    return(
        <div className={`app-form-row__col app-form-row__col--1x2`}>
            <label  className={`app-form__label app-form__label--right`}> {props.elementConfig.title} </label>
            <select  className='app-form__input' {...props.elementConfig} 
                    value={props.value} onChange={props.onChange} >
                { options }
            </select>

        </div>
    )
}

export default FormSelect;