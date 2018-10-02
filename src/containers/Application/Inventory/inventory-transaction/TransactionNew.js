import React, {Component} from 'react';
import {connect} from 'react-redux';

import TransactionForm from './TransactionForm';
import {validateForm} from '../../../../helpers/helpers';
import {createTransaction, showMessages} from '../../../../store/actions/index';

class TransactionNew extends Component {

    state = {
        id: 0,
        transactionType: {
            id: 1
        },
        quantity: '',
        timeStamp: '',
        details: ''
    }

    transactionSavedHandler = (transactionForm) => {

        if(validateForm(transactionForm)){

            const inventoryId = this.props.match.params.id;
            this.props.onCreateTransaction(inventoryId, transactionForm, ()=>{
                this.props.history.push(`/inventories/${inventoryId}`);
            })
            

        }else {
            this.props.onShowMessage('error', ['Forms are not valid for submission']);
        } 

    }

   

    render() {

        return(
            <TransactionForm   
                action='new'
                data={this.state}
                onSave={this.transactionSavedHandler}             
                onCancel={() => this.props.history.goBack()}  />
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onCreateTransaction: (inventoryId, transactionForm, callback) => 
                                dispatch(createTransaction(inventoryId, transactionForm, callback)),
        onShowMessage: (messageType, messages) => dispatch(showMessages(messageType, messages))
    }
}

export default connect(null, mapDispatchToProps)(TransactionNew);