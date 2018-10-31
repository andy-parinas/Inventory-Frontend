import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import InventoryForm from '../inventory-form/InventoryForm';
import {InventoryBackendAPI} from '../../../../AppSettings';
import {showMessages, createInventory} from '../../../../store/actions/index';
import {validateForm} from '../../../../helpers/helpers';

class InventoryNew extends Component {

    state = {
        action: 'new',
        options: [
            'Option1',
            'Option2'
        ],
        inventory: {
            product: '',
            quantity: 0,
            sku: '',
            status: 'No Stock',
            thresholdWarning: 0,
            thresholdCritical: 0,
            location: ''
        }
        
    }


    saveInventoryHandler = (inventoryForm) => {

        if(validateForm(inventoryForm)){

            this.props.onCreateInventory(inventoryForm, (id) => {
                this.props.history.push(`/inventories/show/${id}`);
            })


        }else {
            this.props.onShowMessage('error', ['Forms are not valid for submission']);
        }


        
    }


    render() {

        return(
            <div className='app-row' >
            <div className='app-col app-col--80'>
                <h2>Create New Inventory</h2>
                <InventoryForm  action={this.state.action}
                                onSave={this.saveInventoryHandler}
                                onCancelClicked={() => this.props.history.goBack()} 
                                data={this.state.inventory} options={this.state.options} />
            </div>
            </div>
        )
    }

}



const mapDispatchToProps = dispatch => {
    return {
        onShowMessage: (messageType, messages) => dispatch(showMessages(messageType, messages)),
        onCreateInventory: (inventoryForm, callback) => dispatch(createInventory(inventoryForm, callback))
    }
}

export default connect(null, mapDispatchToProps)(InventoryNew);
// export default InventoryNew;
