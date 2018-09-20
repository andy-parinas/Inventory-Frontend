import React, {Component} from 'react';
import axios from 'axios';

import FormInput from '../../../../components/FormComponent/FormInput';
import FormDataList from '../../../../components/FormComponent/FormDataList';
import {InventoryBackendAPI} from '../../../../AppSettings';
import {validateInput, validateForm, validateData} from '../../../../helpers/helpers';
// import {initialInventoryForm} from '../../../../configurations/inventoryConfigurations'


class InventoryForm extends Component {


    state = {
        edit: false,
        delete: false,
        action: '',
        updated: false,
        form: {
            product: {
                value: '',
                elementConfig : {
                    type: 'text',
                    title: 'Product',
                    name: 'product',
                    placeholder: 'Enter Product Name',
                    list: 'product'
                },
                uriSegment: 'products',
                searchFor: 'name',
                options: [],
                isValid: false,
                touched: false,
                errorMessages: [],
                validations: {
                    required: true,
                    withInOptions: true
                }
            },
            quantity: {
                value: '',
                elementConfig : {
                    type: 'text',
                    title: 'Quantity',
                    name: 'quantity',
                    placeholder: '0.0',
                    // disabled: true
                },
                isValid: false,
                touched: false,
                errorMessages: [],
                validations: {
                    required: false
                }
            },
            sku: {
                value: '',
                elementConfig : {
                    type: 'text',
                    title: 'SKU',
                    name: 'sku',
                    placeholder: 'Enter SKU',
                    // disabled: true
                },
                isValid: false,
                touched: false,
                errorMessages: [],
                validations: {
                    required: true
                }
            },
            status: {
                value: '',
                elementConfig : {
                    type: 'text',
                    title: 'Status',
                    name: 'status',
                    placeholder: 'Enter Status',
                    // disabled: true
                },
                uriSegment: 'inventories/statuses',
                options: [],
                isValid: false,
                touched: false,
                errorMessages: [],
                validations: {
                    required: true
                }
            },
            thresholdWarning: {
                value: '',
                elementConfig : {
                    type: 'text',
                    title: 'Threshold Warning',
                    name: 'thresholdWarning',
                    placeholder: 'Enter Threshold Warning',
                    // disabled:true
                },
                isValid: false,
                touched: false,
                errorMessages: [],
                validations: {
                    required: true,
                    numbersOnly: true
                }
            },
            thresholdCritical: {
                value: '',
                elementConfig : {
                    type: 'text',
                    title: 'Threshold Critical',
                    name: 'thresholdCritical',
                    placeholder: 'Enter Threshold Critical',
                    // disabled: true
                },
                isValid: false,
                touched: false,
                errorMessages: [],
                validations: {
                    required: true,
                    numbersOnly: true
                }
            },
            location: {
                value: '',
                elementConfig : {
                    type: 'text',
                    title: 'Location',
                    name: 'location',
                    placeholder: 'Enter Location',
                    // disabled: true,
                    list: 'location'
                },
                uriSegment: 'locations',
                searchFor: 'name',
                options: [],
                isValid: false,
                touched: false,
                errorMessage: [],
                validations: {
                    required: true,
                    withInOptions: true
                }
            }
        }

    }

    componentDidMount() {
    
        this.setState({
                ...this.state,
                form: {
                    ...this.state.form,
                    product: {
                        ...this.state.form.product,
                        value: this.props.data.product,
                        isValid: true
                    },
                    quantity: {
                        ...this.state.form.quantity,
                        value: this.props.data.quantity,
                        isValid: true
                    },
                    sku: {
                        ...this.state.form.sku,
                        value: this.props.data.sku,
                        isValid: true
                    },
                    thresholdCritical: {
                        ...this.state.form.thresholdCritical,
                        value: this.props.data.thresholdCritical,
                        isValid: true
                    },
                    thresholdWarning: {
                        ...this.state.form.thresholdWarning,
                        value: this.props.data.thresholdWarning,
                        isValid: true
                    },
                    status: {
                        ...this.state.form.status,
                        value: this.props.data.status,
                        isValid: true
                    },
                    location: {
                        ...this.state.form.location,
                        value: this.props.data.location,
                        isValid: true
                    }   
                }
            })

       
    }

    static getDerivedStateFromProps(nextProps, prevState){

        if(nextProps.updateContent){
            return {
                ...prevState,
                form: {
                    ...prevState.form,
                    product: {
                        ...prevState.form.product,
                        value: nextProps.data.product
                    },
                    sku: {
                        ...prevState.form.sku,
                        value: nextProps.data.sku
                    },
                    thresholdCritical: {
                        ...prevState.form.thresholdCritical,
                        value: nextProps.data.thresholdCritical
                    },
                    thresholdWarning: {
                        ...prevState.form.thresholdWarning,
                        value: nextProps.data.thresholdWarning
                    },
                    status: {
                        ...prevState.form.status,
                        value: nextProps.data.status
                    },
                    location: {
                        ...prevState.form.location,
                        value: nextProps.data.location
                    }      
                }
            }
        }

        return null;
    
    }


    inputChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const params = encodeURIComponent(value);

        const validationResult = validateInput(this.state.form[name].validations, value, this.state.form[name].options);


        if(name ==='product' || name === 'location'){        
            this.loadOptions(this.state.form[name].uriSegment,
                this.state.form[name].searchFor, params, name);

            this.setState({
                ...this.state,
                form: {
                    ...this.state.form,
                    [name]: {
                        ...this.state.form[name],
                        value: value,
                        isValid: validationResult.isValid,
                        errorMessages: validationResult.messages,
                        touched: true
                    },
                    sku: {
                        ...this.state.form.sku,
                        value: '',
                        isValid: false,
                        errorMessages: ['Please Re-generate SKU']
                    }
                    
                }
            });
            
        } else {             
            this.setState({
                ...this.state,
                form: {
                    ...this.state.form,
                    [name]: {
                        ...this.state.form[name],
                        value: value,
                        isValid: validationResult.isValid,
                        errorMessages: validationResult.messages,
                        touched: true
                    }
                    
                }
            });
        }
        
    }


    generateSku(productName, locationName) {

        const string1 = productName.split(' ').join('-')
        const string2 = locationName.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'');

        return string1 + '-' + string2;

    }

    generateSkuHandler = () => {

        if(this.state.form.product.value.trim() === '' || this.state.form.location.value.trim() === '' ) {

            this.setState({
                ...this.state,
                form: {
                    ...this.state.form,
                    sku: {
                        ...this.state.form.sku,
                        isValid: false,
                        errorMessages: [
                            'Enter Product and Location First',
                        ],
                        touched: true
                    }
                    
                }
            })
        }else {
            this.setState({
                ...this.state,
                form: {
                    ...this.state.form,
                    sku: {
                        ...this.state.form.sku,
                        value: this.generateSku(this.state.form.product.value, this.state.form.location.value),
                        isValid: true,
                        errorMessages: [],
                        touched: true
                    }
                    
                }
            })

        }

    }

    editHandler = () => {
        // this.disableInputField(false);
    }

    deleteHandler = () => {
        this.setState({
            ...this.state,
            edit: false,
            delete: true
        })
    }

    cancelEditHandler = () => {
        if(this.state.action === 'edit' || this.state.action === 'delete' || this.props.action === 'new' ) {
            this.props.onCancel()
       }else {
        //    this.loadFormData(this.props.data, true, true)
       }
    }

    cancelDeleteHandler = () => {
        if(this.props.action === 'edit' || this.props.action === 'delete' ) {
            this.props.onCancel()
        }else {
            this.setState({
                ...this.state,
                edit: false,
                delete: false
            })
        }
    }

    saveHandler = () => {
        this.props.onSave(this.state.form);
    }
    
    /*
        searchFor - name of the property in the object that is being searched
    */
    async loadOptions(uriSegment, searchFor, params, name) {
        try {
            const response = await axios.get(`${InventoryBackendAPI}/${uriSegment}?${searchFor}=${params}`)
            
            const options = response.data.map(row => {
                return row[searchFor];
            })

            this.setState({
                ...this.state,
                form:{
                    ...this.state.form,
                    [name]: {
                        ...this.state.form[name],
                        options: options
                    }
                }
            })
        }catch(error) {
            console.log(error);
        }
    }



    formSubmitHandler = (event) => {
        event.preventDefault();
    }

    renderSaveCancelButton = () => (
        <div className='app-page__control'>
            <div className='app-group' >
                <button type='button' className='app-btn' name='save'
                        onClick={this.saveHandler}>Save</button>
                <button type='button' className='app-btn' name='cancelEdit'
                        onClick={this.props.onCancelClicked} >Cancel</button>
            </div>
        </div>
    )

    renderEditDeleteButton = () => (
        <div className='app-page__control'>
                <div className='control-group control-group--col2 control-group--right'>
                    <button typeof='button' className='app-btn' name='edit'
                            onClick={this.props.onEditClicked} >Edit</button>
                    <button type='button' className='app-btn' name='delete'
                            onClick={this.props.onDeleteClicked} >Delete</button>
                </div>
          </div>
    )

    renderDeleteCofirmButton = () => (
        <div className='app-page__control'>
            <div className='control-group'>
                <span> Confirm Delete? </span>
                <button type='button' className='app-btn' 
                    onClick={this.props.onDeleteConfirmed}>Yes</button>

                <button type='button' className='app-btn'
                        onClick={this.props.onCancelClicked} >No</button>
            </div>
        </div>
    )

    render() {

        let disabled = true;

        if(this.props.action === 'edit') {
            disabled = false;
        }

        if(this.props.action === 'new'){
            disabled = false;
        }


        let sku = (
            <FormInput 
                value={this.state.form.sku.value} onChange={this.inputChangeHandler}
                isValid={this.state.form.sku.isValid}
                touched={this.state.form.sku.touched}
                errorMessages={this.state.form.sku.errorMessages}
                elementConfig={this.state.form.sku.elementConfig}
                disabled={true} />
        )

        if(this.props.action === 'new' || this.props.action === 'edit' || this.state.edit ){
            sku = (
                <FormInput 
                    value={this.state.form.sku.value} 
                    withButton={true} buttonName='Generate' 
                    onButtonClick={this.generateSkuHandler}
                    isValid={this.state.form.sku.isValid} onChange={this.inputChangeHandler}
                    touched={this.state.form.sku.touched}
                    errorMessages={this.state.form.sku.errorMessages}
                    elementConfig={this.state.form.sku.elementConfig}
                    disabled={true} />
            )
        }

        return(
            <form onSubmit={this.formSubmitHandler} >
                <div className='app-form-container' >
                    <div className='app-form-row app-form-row--2'>

                        { sku }

                        <FormInput 
                            value={this.state.form.quantity.value}
                            onChange={this.inputChangeHandler}
                            isValid={this.state.form.quantity.isValid}
                            touched={this.state.form.quantity.touched}
                            errorMessages={this.state.form.quantity.errorMessages}
                            elementConfig={this.state.form.quantity.elementConfig} 
                            disabled={true} />

                    </div>
                    <div className='app-form-row app-form-row--2'>

                        <FormDataList 
                            value={this.state.form.product.value}
                            onChange={this.inputChangeHandler}
                            isValid={this.state.form.product.isValid}
                            touched={this.state.form.product.touched}
                            errorMessages={this.state.form.product.errorMessages}
                            options={this.state.form.product.options}
                            elementConfig={this.state.form.product.elementConfig}
                            disabled={disabled} />

                        <FormInput 
                            value={this.state.form.status.value}
                            onChange={this.inputChangeHandler} 
                            isValid={this.state.form.status.isValid}
                            touched={this.state.form.status.touched}
                            errorMessages={this.state.form.status.errorMessages}
                            elementConfig={this.state.form.status.elementConfig}
                            disabled={true} />

                    </div>
                    <div className='app-form-row app-form-row--2'>

                        <FormInput 
                            value={this.state.form.thresholdWarning.value}
                            onChange={this.inputChangeHandler}
                            isValid={this.state.form.thresholdWarning.isValid}
                            touched={this.state.form.thresholdWarning.touched}
                            errorMessages={this.state.form.thresholdWarning.errorMessages}
                            elementConfig={this.state.form.thresholdWarning.elementConfig}
                            disabled={disabled} />

                        <FormInput 
                            value={this.state.form.thresholdCritical.value}
                            onChange={this.inputChangeHandler}
                            isValid={this.state.form.thresholdCritical.isValid}
                            touched={this.state.form.thresholdCritical.touched}
                            errorMessages={this.state.form.thresholdCritical.errorMessages}
                            elementConfig={this.state.form.thresholdCritical.elementConfig}
                            disabled={disabled} />

                    </div>
                    <div className='app-form-row app-form-row--2'>
                        <FormDataList 
                            value={this.state.form.location.value}
                            onChange={this.inputChangeHandler}
                            isValid={this.state.form.location.isValid}
                            touched={this.state.form.location.touched}
                            errorMessages={this.state.form.location.errorMessages}
                            options={this.state.form.location.options}
                            elementConfig={this.state.form.location.elementConfig}
                            disabled={disabled} />
                    </div>            
                </div>
               { 

                    this.props.action === 'new' || this.props.action === 'edit' ? this.renderSaveCancelButton() : 
                    this.props.action === 'delete'? this.renderDeleteCofirmButton() : 
                    this.renderEditDeleteButton() 
                }
            </form>
        )
    }
}

export default InventoryForm;