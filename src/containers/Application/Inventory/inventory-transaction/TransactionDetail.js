import React, {Component} from 'react';
// import axios from 'axios';
import {connect} from 'react-redux';

import {loadTransaction} from '../../../../store/actions/index';

import TransactionForm from './TransactionForm';
import InventoryTitleControl from '../InventoryTitleControl';
// import {InventoryBackendAPI} from '../../../../AppSettings';
import LoadingComponent from '../../../../components/UI/LoadingComponent';


class TransactionDetail extends Component {

    state = {
        action: '',
        edit: false,
        delete: false,
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
        this.setState({
            ...this.state,
            action: 'edit'
        })
    }

    cancelButtonHandler = () => {
        if(this.state.action === 'edit' || this.state.action === 'delete' ){
            this.props.history.goBack();
        }else{
            this.setState({
                ...this.state,
                action: 'detail'
            })
        }  
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
                    onCancel={() => this.props.history.goBack()}  />
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
        onLoadTransaction: (transactionId) => dispatch(loadTransaction(transactionId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail);