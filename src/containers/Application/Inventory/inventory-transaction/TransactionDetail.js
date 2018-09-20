import React, {Component} from 'react';
import axios from 'axios';

import TransactionForm from './TransactionForm';
import InventoryTitleControl from '../InventoryTitleControl';
import {InventoryBackendAPI} from '../../../../AppSettings';
import LoadingComponent from '../../../../components/UI/LoadingComponent';


class TransactionDetail extends Component {

    state = {
        action: '',
        edit: false,
        delete: false,
        transaction: null
    }


    componentDidMount() {
        this.checkActionParams();

        this.loadData();
    }


    async loadData() {
        try {

            const transId = this.props.match.params.transId;
            const api = `${InventoryBackendAPI}/transactions/${transId}`;

            const response = await axios.get(api);

            this.setState({
                ...this.state,
                transaction: response.data
            })


        }catch(error) {

        }
    }


    addTransactionHandler = () => {

    }

    backToListButtonHandler = () => {
        this.props.history.goBack();
    }

    deleteButtonHandler = () => {
        this.setState({
            ...this.state,
            delete: true,
            edit: false
        })
    }

    editButtonHandler = () => {
        this.setState({
            ...this.state,
            delete: false,
            edit: true,
        })
    }

    cancelButtonHandler = () => {
        if(this.state.action === 'edit' || this.state.action === 'delete' ){
            this.props.history.goBack();
        }else{
            this.setState({
                ...this.state,
                edit: false,
                delete: false
            })
        }  
    }


    checkActionParams = () => {
        if(this.props.match.params.transAction === 'edit'){
            this.setState({
                ...this.state,
                edit: true,
                delete: false,
                action: 'edit'
            })
        }else if(this.props.match.params.transAction === 'delete'){
            this.setState({
                ...this.state,
                edit: false,
                delete: true,
                action: 'delete'
            })
        }else{
            this.setState({
                ...this.state,
                edit: false,
                delete: false
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

                <TransactionForm    edit={this.state.edit} 
                                    delete={this.state.delete} 
                                    data={this.state.transaction}
                                    // onEditSubmit={this.editButtonHandler} 
                                    // onDeleteSubmit={this.deleteButtonHandler}
                                    // onCancelSubmit={this.cancelButtonHandler}
                                    action={this.state.action} 
                                    onCancel={() => this.props.history.goBack()}  />
            </div>
        )
    }

    render(){

        return this.state.transaction? this.renderContent() : <LoadingComponent />
    }

}

export default TransactionDetail;