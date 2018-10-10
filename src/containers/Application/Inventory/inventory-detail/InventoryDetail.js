import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import InventoryForm from '../inventory-form/InventoryForm';
import TransactionContainer from '../inventory-transaction/TransactionContainer';
import TitleControl from '../../../../components/PageTitle/TitleControl';
import {validateForm} from '../../../../helpers/helpers'
import {showMessages, loadInventory, updateInventory, deleteInventory} from '../../../../store/actions/index';
import withLoading from '../../../../hoc/withLoading';

class InventoryDetail extends Component {

    state = {
        action: 'details',
        inventory: null,
        updateContent: false,
        message: {
            type: 'hidden',
            details: []
        }
    }

    componentDidMount() {

        const inventoryId = this.props.match.params.id;
        this.props.onLoadInventory(inventoryId);

        this.setState({
            ...this.state,
            action: this.props.location.state? this.props.location.state.action : 'details' 
        })

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
        const inventoryId = this.props.match.params.id;

        this.props.onDeleteInventory(inventoryId, () => {
            this.props.history.push('/inventories');
        })

    }


    updateInventoryHandler = (inventoryForm) => {
        if(validateForm(inventoryForm)){
            
            const inventoryId = this.props.match.params.id;
            this.props.onUpdateInventory(inventoryId, inventoryForm, () => {
                this.setState({
                    ...this.state,
                    action: 'details',
                    updateContent: true
                })
            });

        }else {
            
            this.props.onShowMessage('error', ['Form not valid for submission']);
        }
    }

    /*
    *  End of Form Buttons Handler
    */




    renderDetails = () => {
        const titleButtons = [
            {name: 'New Inventory', action: ()=> this.props.history.push('/inventories/new')},
            {name: '< Go Back', action: () => this.props.history.push('/inventories') }
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

                        <TitleControl  title='Inventory' action={this.state.action}
                                buttons={titleButtons} showButton={showButton} />

                        <InventoryForm  
                            action={this.state.action} 
                            updateContent={this.state.updateContent}
                            onSave={this.updateInventoryHandler}
                            onEditClicked={this.editButtonHandler}
                            onCancelClicked={this.cancelButtonHander}
                            onDeleteClicked={this.deleteButtonHandler}
                            onDeleteConfirmed={this.deleteConfirmedHandler}
                            data={this.props.inventory} options={[]} />
                    </div>
                </div>
                { transaction }
            </Fragment>
        )  
    }

   
    render() {
        return this.props.inventory? this.renderDetails() : ''; 
    }

}

const mapStateToProps = state => {
    return {
        inventory: state.inventories.inventory
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowMessage: (messageType, messages) => dispatch(showMessages(messageType, messages)),
        onLoadInventory: (inventoryId) => dispatch(loadInventory(inventoryId)),
        onUpdateInventory: (inventoryId, inventoryForm, callback) => dispatch(updateInventory(inventoryId, inventoryForm, callback)),
        onDeleteInventory: (inventoryId, callback) => dispatch(deleteInventory(inventoryId, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoading(InventoryDetail));