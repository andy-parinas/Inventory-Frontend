import React, {Component} from 'react';
import FormInput from '../../../../components/FormComponent/FormInput';
import FormTextArea from '../../../../components/FormComponent/FormTextArea';


class TransactionForm extends Component {

    state = {
        // edit: false,
        // delete: false,
        transaction: {
            transaction: '',
            quantity: '',
            timeStamp: '',
            details: ''
        },
        originalData: {
            transaction: '',
            quantity: '',
            timeStamp: '',
            details: ''
        },
        edit: this.props.action === 'edit',
        delete: this.props.action === 'delete'

    }


    componentDidMount() {
        this.setState({
            ...this.state,
            transaction: {
                transaction: this.props.data.transactionType.name,
                quantity: this.props.data.quantity,
                timeStamp: this.props.data.timeStamp,
                details: this.props.data.details
            },
            originalData: {
                transaction: this.props.data.transactionType.name,
                quantity: this.props.data.quantity,
                timeStamp: this.props.data.timeStamp,
                details: this.props.data.details
            }
        })
    }


    submitFormHandler = (event) => {
        event.preventDefault();
    }

    onInputChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            ...this.state,
            transaction: {
                ...this.state.transaction,
                [name]: value
            }
        })
    }


    cancelEditButtonHandler = () => {
        if(this.state.action === 'edit' || this.state.action === 'delete' ) {
             this.props.onCancel()
        }else {
            this.setState({
                ...this.state,
                edit: false,
                delete: false,
                transaction: this.state.originalData
            })
        }
     }
 
     cancelDeleteButtonHandler = () => {
         if(this.state.action === 'edit' || this.state.action === 'delete' ) {
             this.props.onCancel()
        }else {
            this.setState({
                ...this.state,
                edit: false,
                delete: false
            })
        }
     }
 
     editButtonHandler = () => {
         this.setState({
             ...this.state,
             edit: true,
             delete: false
         })
     }
 
     deleteButtonHandler = () => {
         this.setState({
             ...this.state,
             edit: false,
             delete: true
         })
     }


    renderSaveCancelButton = () => (
        <div className='app-page__control'>
            <div className='app-group' >
                <button type='button' className='app-btn'>Save</button>
                <button type='button' className='app-btn'
                        onClick={this.cancelEditButtonHandler} >Cancel</button>
            </div>
        </div>
    )

    renderEditDeleteButton = () => (
        <div className='app-page__control'>
                <div className='control-group control-group--col2 control-group--right'>
                    <button type='button' className='app-btn' 
                            onClick={this.editButtonHandler} >Edit</button>
                    <button type='button' className='app-btn' 
                            onClick={this.deleteButtonHandler} >Delete</button>
                </div>
          </div>
    )

    renderDeleteCofirmButton = () => (
        <div className='app-page__control'>
            <div className='control-group'>
                <span> Confirm Delete? </span>
                <button type='button' className='app-btn'>Yes</button>
                <button type='button' className='app-btn' 
                        onClick={this.cancelDeleteButtonHandler} >No</button>
            </div>
        </div>
    )

    render() {

        return(
            <form onSubmit={this.submitFormHandler} >
            <div className='app-form-container'>
                <div className='app-form-row app-form-row--2'>
                    <FormInput  labelPostion='right' title='Transaction Type' name='transaction' 
                                onInputChange={this.onInputChangeHandler} edit={this.state.edit}
                                inputValue={this.state.transaction.transaction} />
                    <FormInput  labelPostion='right' title='Quantity' name='quantity'
                                onInputChange={this.onInputChangeHandler} edit={this.state.edit}
                                inputValue={this.state.transaction.quantity} />
                </div>

                <div className='app-form-row app-form-row--2'>
                    <FormInput  labelPostion='right' title='Time Stamp' name='timeStamp' 
                                onInputChange={this.onInputChangeHandler} edit={this.state.edit}
                                inputValue={this.state.transaction.timeStamp} />
                </div>
                <div className='app-form-row app-form-row--1'>
                    <FormTextArea   labelPostion='right' title='Details' name='details' 
                                    onInputChange={this.onInputChangeHandler} edit={this.state.edit}
                                    inputValue={this.state.transaction.details} />
                </div>
            </div>

             { this.state.edit || this.state.action === 'edit' ? this.renderSaveCancelButton() : 
                this.state.delete || this.state.action === 'delete'? this.renderDeleteCofirmButton() : 
                this.renderEditDeleteButton() }
            </form>
        )
    }


}

export default TransactionForm;