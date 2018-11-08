import React, {Component} from 'react';
import FormInput from '../../../../components/FormComponent/FormInput';
import FormTextArea from '../../../../components/FormComponent/FormTextArea';
import axios from 'axios';
import {InventoryBackendAPI} from '../../../../AppSettings';
import FormSelect from '../../../../components/FormComponent/FormSelect';
import {validateInput, getAuthHeader} from '../../../../helpers/helpers';

class TransactionForm extends Component {

    state = {
        id: 0,
        form: {
            transaction: {
                value: 1,
                elementConfig: {
                    type: 'text',
                    title: 'Transaction',
                    name: 'transaction',
                    placeholder: 'Enter Transaction Type'
                },
                isValid: true,
                touched: false,
                errorMessages: [],
                validations: {
                    required: true
                }
            },
            quantity: {
                value: '',
                elementConfig: {
                    type: 'text',
                    title: 'Quantity',
                    name: 'quantity',
                    placeholder: 'Enter Quantity'
                },
                isValid: false,
                touched: false,
                errorMessages: [],
                validations: {
                    required: true,
                    numbersOnly: true
                }
            },
            timeStamp: {
                value: '',
                elementConfig: {
                    type: 'text',
                    title: 'TimeStamp',
                    name: 'timestamp',
                    placeholder: ''
                },
                isValid: true,
                touched: false,
                errorMessages: [],
                validations: {
                    required: true
                }
            },
            details: {
                value: '',
                elementConfig: {
                    type: 'text',
                    title: 'Details',
                    name: 'details',
                    placeholder: 'Enter Details'
                },
                isValid: false,
                touched: false,
                errorMessages: [],
                validations: {
                    required: false,
                }
            }
        },
        transactionOptions: []
    }


    componentDidMount() {
        if(this.props.data) {
            this.setState({
                ...this.state,
                id: this.props.data.id,
                form: {
                    ...this.state.form,
                    transaction: {
                        ...this.state.form.transaction,
                        value: this.props.data.transactionType.id
                    },
                    quantity: {
                        ...this.state.form.quantity,
                        value: this.props.data.quantity
                    },
                    timeStamp: {
                        ...this.state.form.timeStamp,
                        value: this.props.data.timeStamp
                    },
                    details: {
                        ...this.state.form.details,
                        value: this.props.data.details
                    }
                }
            });
        }

        this.loadTransactionOptions();
    }


    async loadTransactionOptions() {
        try {
            const uri = `${InventoryBackendAPI}/transactions/types`;
            const headers = getAuthHeader();

            const response = await axios.get(uri, {headers: headers});

            this.setState({
                ...this.state,
                transactionOptions: response.data
            })

        }catch(error){
            console.log(error.response);
        }
    }


    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.updateContent || nextProps.data.id !== prevState.id 
            || nextProps.data.timeStamp !== prevState.form.timeStamp.value){
            return {
                ...prevState,
                id: nextProps.data.id,
                form: {
                    ...prevState.form,
                    transaction: {
                        ...prevState.form.transaction,
                        value: nextProps.data.transactionType.id
                    },
                    quantity: {
                        ...prevState.form.quantity,
                        value: nextProps.data.quantity
                    },
                    timeStamp: {
                        ...prevState.form.timeStamp,
                        value: nextProps.data.timeStamp
                    },
                    details: {
                        ...prevState.form.details,
                        value: nextProps.data.details
                    }
                }
            }
        }

        return null;
    }


    submitFormHandler = (event) => {
        event.preventDefault();
    }

    inputChangedHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        const validationResult = validateInput(this.state.form[name].validations, value, 
            this.state.form[name].options);


        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [name] : {
                    ...this.state.form[name],
                    value: value,
                    isValid: validationResult.isValid,
                    errorMessages: validationResult.messages,
                    touched: true
                }
            }
        })
    }

    saveButtonHandler = () => {
        this.props.onSave(this.state.form)
    }


    renderSaveCancelButton = () => (
        <div className='app-page__control'>
            <div className='app-group' >
                <button type='button' className='app-btn' 
                    onClick={this.saveButtonHandler} >Save</button>
                <button type='button' className='app-btn'
                        onClick={this.props.onCancelClicked} >Cancel</button>
            </div>
        </div>
    )

    renderEditDeleteButton = () => (
        <div className='app-page__control'>
                <div className='control-group control-group--col2 control-group--right'>
                    <button type='button' className='app-btn' 
                            onClick={this.props.onEditClicked} >Edit</button>
                    <button type='button' className='app-btn' 
                            onClick={this.props.onDeleteClicked} >Delete</button>
                </div>
          </div>
    )

    renderDeleteCofirmButton = () => (
        <div className='app-page__control'>
            <div className='control-group'>
                <span> Confirm Delete? </span>
                <button type='button' className='app-btn' onClick={this.props.onDeleteConfirmed} >Yes</button>
                <button type='button' className='app-btn' 
                        onClick={this.cancelDeleteButtonHandler} >No</button>
            </div>
        </div>
    )

    render() {
        console.log('action: ', this.props.action);
        let disabled = true;
        if(this.props.action === 'new' || this.props.action === 'edit'){
            disabled = false;
        }

        return(
            <form onSubmit={this.submitFormHandler} >
            <div className='app-form-container app-form-container--3rows'>
                <div className='app-form-row app-form-row--r1c1'>
                    <FormSelect 
                            value={this.state.form.transaction.value}
                            options={this.state.transactionOptions}
                            onChange={this.inputChangedHandler}
                            elementConfig={this.state.form.transaction.elementConfig} 
                            disabled={disabled} />
                </div>
                <div className='app-form-row app-form-row--3rc2'>
                    <FormTextArea   
                            value={this.state.form.details.value}
                            onChange={this.inputChangedHandler}
                            isValid={this.state.form.details.isValid}
                            touched={this.state.form.details.touched}
                            errorMessages={this.state.form.details.errorMessages}
                            elementConfig={this.state.form.details.elementConfig} 
                            disabled={disabled} />

                </div>

                 <div className='app-form-row app-form-row--r2c1'>
                    
                    <FormInput 
                                value={this.state.form.quantity.value}
                                onChange={this.inputChangedHandler}
                                isValid={this.state.form.quantity.isValid}
                                touched={this.state.form.quantity.touched}
                                errorMessages={this.state.form.quantity.errorMessages}
                                elementConfig={this.state.form.quantity.elementConfig} 
                                disabled={disabled} />

                </div>
                <div className='app-form-row app-form-row--r3c1'>
                    
                    <FormInput 
                                value={this.state.form.timeStamp.value}
                                onChange={this.inputChangedHandler}
                                isValid={this.state.form.timeStamp.isValid}
                                touched={this.state.form.timeStamp.touched}
                                errorMessages={this.state.form.timeStamp.errorMessages}
                                elementConfig={this.state.form.timeStamp.elementConfig} 
                                disabled={true} />
                </div>
            </div>

             { this.props.action === 'edit' || this.props.action === 'new' ? this.renderSaveCancelButton() : 
                this.props.action === 'delete'? this.renderDeleteCofirmButton() : 
                this.renderEditDeleteButton() }
            </form>
        )
    }


}

export default TransactionForm;