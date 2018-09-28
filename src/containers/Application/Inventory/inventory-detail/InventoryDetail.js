import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import InventoryForm from '../inventory-form/InventoryForm';
import TransactionContainer from '../inventory-transaction/TransactionContainer';
import InventoryTitleControl from '../InventoryTitleControl';
import LoadingComponent from '../../../../components/UI/LoadingComponent';
import {validateForm} from '../../../../helpers/helpers'
import {showMessages, loadInventory, updateInventory, deleteInventory} from '../../../../store/actions/index';
import withLoading from '../../../../hoc/withLoading';

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

        const inventoryId = this.props.match.params.id;
        this.props.onLoadInventory(inventoryId);

        console.log('ComponentDidMount - InventoryDetail')

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
        // this.deleteData(() => {
        //     this.props.history.push('/inventories');
        // });
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
                    action: 'show',
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