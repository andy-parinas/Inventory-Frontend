import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import TransactionForm from './TransactionForm';
import {validateForm, convertFormToObject} from '../../../../helpers/helpers';
import {InventoryBackendAPI} from '../../../../AppSettings';
import {showMessages} from '../../../../store/actions/index';

class TransactionNew extends Component {

    state = {
        action: 'new'
    }

    componentDidMount(){
        console.log(this.props);
    }

    transactionSavedHandler = (transactionForm) => {
        const newTransaction = {
            transaction: 0,
            quantity: 0,
            details: ''
        }

        if(validateForm(transactionForm)){

            convertFormToObject(transactionForm, newTransaction);

            const inventoryId = this.props.match.params.id;
            
            this.postTransactionToBackend(newTransaction, inventoryId);

        }else {
            this.props.onShowMessage('error', ['Forms are not valid for submission']);
        }

        

    }

    async postTransactionToBackend(transaction, inventoryId){
        
        try{

            const uri = `${InventoryBackendAPI}/inventories/${inventoryId}/transactions`;
            const response = await axios.post(uri, transaction);

            if(response.status === 200){
                this.props.history.push(`/inventories/${inventoryId}`);
                this.props.onShowMessage('success', ['Successfully Created Transaction']);
            }


        }catch(error){

            console.log(error);
            let messages = [];
            for(let err in error.response.data){
                messages.push(error.response.data[err][0]);
            }
            
            this.props.onShowMessage('error', messages);
        }

    }

    render() {

        return(
            <TransactionForm   
                action={this.state.action}
                onSave={this.transactionSavedHandler}             
                onCancel={() => this.props.history.goBack()}  />
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onShowMessage: (messageType, messages) => dispatch(showMessages(messageType, messages))
    }
}

export default connect(null, mapDispatchToProps)(TransactionNew);