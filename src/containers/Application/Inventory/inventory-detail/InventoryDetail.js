import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import InventoryForm from '../inventory-form/InventoryForm';
import TransactionContainer from '../inventory-transaction/TransactionContainer';
import InventoryTitleControl from '../InventoryTitleControl';
import {InventoryBackendAPI} from '../../../../AppSettings';
import LoadingComponent from '../../../../components/UI/LoadingComponent';
import AlertMessage from '../../../../components/AlertMessageComponent/AlertMessage';
import {validateForm, convertFormToObject} from '../../../../helpers/helpers'
import {showMessages} from '../../../../store/actions/index';

class InventoryDetail extends Component {

    state = {
        action: 'show',
        inventory: null,
        updateContent: false,
        message: {
            type: 'hidden',
            details: []
        }
    }

    componentDidMount() {
       this.checkActionParams();
       
       this.loadData();
             
        if(this.props.location.state){
            if(this.props.location.state.message) {
                const messages = [];
                messages.push(this.props.location.state.message.details)
                this.setState({
                    ...this.state,
                    message: {
                        type: this.props.location.state.message.type,
                        details: [...messages]
                    }
                })
            }

            if(this.props.location.state.action){
                if(this.props.location.state.action == 'edit'){
                    this.setState({
                        ...this.state,
                        action: 'edit'
                    })
                }else if(this.props.location.state.action == 'delete'){
                    this.setState({
                        ...this.state,
                        action: 'delete'
                    })
                }else {
                    this.setState({
                        ...this.state,
                        action: 'show'
                    })
                }
            }
        }

    }


    async loadData() {
        try {
            const response = await axios.get(`${InventoryBackendAPI}/inventories/${this.props.match.params.id}`)
            
            this.setState({
                    ...this.state,
                    inventory: response.data
            })
        }catch(error) {
            console.log(error);
        }
    }

    async deleteData(callback) {
        try {
            const response = await axios.delete(`${InventoryBackendAPI}/inventories/${this.props.match.params.id}`)
            
           if(response.status === 200){
               callback();
               this.props.onShowMessage('success', ['Successfully Deleted Inventory'])
           }
            
        }catch(error) {
            console.log(error);
        }
    }


    /*
    *  Form Buttons Handler
    */

    newButtonHandler = () => {
        this.props.history.push('/inventories/new');
    }

    editButtonHandler = () => {
        this.setState({
            ...this.state,
            action: 'edit',
            updateContent: false
        })
    }

    cancelButtonHander = () => {
        this.setState({
            ...this.state,
            action: 'details',
            updateContent: true
        })
    }

    deleteButtonHandler = () => {
        this.setState({
            ...this.state,
            action: 'delete',
            updateContent: false
        })
    }

    deleteConfirmedHandler = () => {
        this.deleteData(() => {
            this.props.history.push('/inventories');
        });


    }

    /*
    *  End of Form Buttons Handler
    */


    checkActionParams () {

        if(this.props.match.params.action === 'edit'){
            this.setState({
                ...this.state,
                action: 'edit'
            })
        }else if(this.props.match.params.action === 'delete'){
            this.setState({
                ...this.state,
                action: 'delete'
            })
        }
    }

    dismissMessageHandler = () => {
        this.setState({
            ...this.state,
            message: {
                type: 'hidden',
                details: []
            }
        })
    }

    updateInventoryHandler = (inventoryForm) => {
        if(validateForm(inventoryForm)){
        
        const inventory = {
            product: '',
            sku: '',
            thresholdWarning: 0,
            thresholdCritical: 0,
            location: ''
        }

        convertFormToObject(inventoryForm,inventory);

        this.saveData(inventory);

        }else {
            
            this.props.onShowMessage('error', ['Form not valid for submission']);
        }
    }

    async saveData(inventory){
        try {
            const uri = `${InventoryBackendAPI}/inventories/${this.props.match.params.id}`;
            const response = await axios.put(uri, inventory)
            
            this.setState({
                    ...this.state,
                    inventory: response.data,
                    message: {
                        type: 'success',
                        details: ['Inventory Successfuly Updated']
                    },
                    action: 'detail',
                    updateContent: true
            })

            this.props.onShowMessage('success', ['Successfully Updated Inventory']);

        }catch(error) {


            if(error.response.data && error.response.status === 400){

                let messages = [];
                for(let err in error.response.data){
                    messages.push(error.response.data[err][0]);
                }
                
                this.props.onShowMessage('error', messages);

            }

        }
    }


    renderDetails = () => {
        const titleButtons = [
            {name: 'New Inventory', action: this.newButtonHandler},
            {name: '< Go Back', action: () => this.props.history.goBack() }
        ]

        let transaction = <TransactionContainer />; 
        let showButton = true;

        if(this.state.action === 'edit' || this.state.action === 'delete'){
            transaction = '';
            showButton = false;
        }

        return(
            <Fragment>
                <div className='app-row' >                
                    <div className='app-col app-col--80'>

                        <InventoryTitleControl  title='Inventory Detail' 
                                buttons={titleButtons} showButton={showButton} />

                        <InventoryForm  
                            action={this.state.action} 
                            updateContent={this.state.updateContent}
                            onSave={this.updateInventoryHandler}
                            onEditClicked={this.editButtonHandler}
                            onCancelClicked={this.cancelButtonHander}
                            onDeleteClicked={this.deleteButtonHandler}
                            onDeleteConfirmed={this.deleteConfirmedHandler}
                            data={this.state.inventory} options={[]} />
                    </div>
                </div>
                { transaction }
            </Fragment>
        )  
    }

   
    render() {

        return this.state.inventory? this.renderDetails() : <LoadingComponent /> 
    }

}


const mapDispatchToProps = dispatch => {
    return {
        onShowMessage: (messageType, messages) => dispatch(showMessages(messageType, messages))
    }
}

export default connect(null, mapDispatchToProps)(InventoryDetail);