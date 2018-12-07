
export const  validateInput = (validations, value, options?) => {
    let isValid = true;
    let messages = [];

    if(validations.required){
        if(value.trim() !== '' && isValid){
            isValid = true;
        }else {
            isValid = false;
            messages.push('Field is required');
        }
    }

    if(validations.numbersOnly) {
        const reg = /^[0-9]\d*(\.\d+)?$/;
        if(reg.test(value) && isValid){
            isValid = true;
        }else {
            isValid = false;
            messages.push('Field must only contain numbers')
        }
    }

    if(validations.withInOptions){
        if(options){
            const found = options.find(element => {
                if(element === value){
                    return true;
                }

                return false;
            })

            if(found && isValid){
                isValid = true;
            }else{
                isValid = false;
                messages.push('Entered Value not Found in Database');
            }
        }
    }
    return {
        isValid: isValid,
        messages: messages
    };

}


export const validateForm = (formObject) => {

    for( const property in formObject){
        
        if(!formObject[property].isValid){
            return false;
        }

    }

    return true;


}

export const validateData =(data, validation) => {

    if(validation === 'string' ){
        if(data.trim() === '' ){
            return false;
        }
    }

    if(validation === 'numbers'){
        const reg = /^[1-9]\d*(\.\d+)?$/;
        if(!reg.test(data)){
            return false;
        }
    }

    return true;

}

export const convertFormToObject = (form, object) => {

    for(const property in object){
        object[property] = form[property].value
    }

}

export const getAuthHeader = () => {

    const authBearer = `Bearer ${localStorage.getItem('token')}`;

    return {
        'Content-Type': 'application/json',
        'Authorization': authBearer
    }
}
