import React from 'react';


const FormTextArea = ({labelPostion, title, name, inputValue, onInputChange, edit}) => {

    return(
        <div className='app-form-row__col app-form-row__col--1x2x1x2'>
            <label  className={`app-form__label app-form__label--${labelPostion}`}> {title} </label>
            <textarea   className='app-form__textArea app-form-row__col--2' rows='5'
                        name={name} 
                        placeholder={`Enter ${title}`} 
                        onChange={onInputChange}  disabled={!edit}
                        value={inputValue} ></textarea>
        </div>
    )
}

export default FormTextArea;