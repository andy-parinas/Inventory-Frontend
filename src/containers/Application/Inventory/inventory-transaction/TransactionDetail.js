import React, {Component} from 'react';
// import axios from 'axios';
import {connect} from 'react-redux';

import {loadTransaction, updateTransaction, showMessages, deleteTransction} from '../../../../store/actions/index';

import TransactionForm from './TransactionForm';
import InventoryTitleControl from '../InventoryTitleControl';
import LoadingComponent from '../../../../components/UI/LoadingComponent';
import { validateForm } from '../../../../helpers/helpers';


class TransactionDetail extends Component {

    state = {
        action: '',
        updateContent: false,
        transaction: null
    }


    componentDidMount() {
        const transactionId = this.props.match.params.transId;
        this.props.onLoadTransaction(transactionId);
    }

    

    addTransactionHandler = () => {

    }

    backToListButtonHandler = () => {
        this.props.history.goBack();
    }

    deleteButtonHandler = () => {
        this.setState({
            ...this.state,
            action: 'delete'
        })
    }

    editButtonHandler = () => {
        console.log('SetState called')
        this.setState({
            ...this.state,
            action: 'edit',
            updateContent: false
        })
    }

    cancelButtonHandler = () => {
        this.setState({
            ...this.state,
            action: 'detail',
            updateContent: true
        })
    }

    transactionUpdatedHandler = (transactionForm) => {

        if(validateForm){
            const inventoryId = this.props.match.params.id;
            const transactionId = this.props.match.params.transId;

            this.props.onUpdateTransaction(inventoryId,transactionId, transactionForm, () => {
                this.setState({
                    ...this.state,
                    action: 'detail'
                })
            })

        }else {
            this.props.onShowMessage('error', ['Form not valid for submission']);
        }

    }

    transactionDeletedHandler = () => {
        const transactionId = this.props.match.params.transId;
        

        this.props.onDeleteTransaction(transactionId, () => {
            this.props.history.push(`/inventories/${this.props.match.params.id}`);
        })

    }

    renderContent = () => {

        const titleButtons = [
            {name: 'Add Transaction', action: this.newButtonHandler},
            {name: '< Transaction List', action: this.backToListButtonHandler}
        ]

        let showButton = true;
                                                    
        if(this.state.action === 'edit' || this.state.action === 'delete'){
            showButton = false;
        }

        return (
            <div className='app-row'>
                <InventoryTitleControl  title='Transaction Detail'
                                        edit={this.state.edit} 
                                        delete={this.state.delete} 
                                        buttons={titleButtons} 
                                        showButton={showButton} />

                <TransactionForm     
                    data={this.props.transaction}
                    action={this.state.action} 
                    updateContent={this.state.updateContent}
                    onSave={this.transactionUpdatedHandler}
                    onEditClicked={this.editButtonHandler}
                    onCancelClicked={this.cancelButtonHandler}
                    onDeleteClicked={this.deleteButtonHandler}
                    onDeleteConfirmed={this.transactionDeletedHandler}  />
            </div>
        )
    }

    render(){
        console.log(this.props);
        return this.props.transaction? this.renderContent() : <LoadingComponent />
    }

}


const mapStateToProps = state => {
    return {
        transaction: state.transactions.transaction,
        transactions: state.transactions.transactions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadTransaction: (transactionId) => dispatch(loadTransaction(transactionId)),
        onUpdateTransaction: (inventoryId, transactionId, transactionForm, callback) => dispatch(updateTransaction(
            inventoryId, transactionId, transactionForm, callback)),
        onDeleteTransaction: (transactionId, callback) => dispatch(deleteTransction(transactionId, callback)),
        onShowMessage: (messageType, messages) => dispatch(showMessages(messageType, messages))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail);