import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import InventoryForm from '../inventory-form/InventoryForm';
import {InventoryBackendAPI} from '../../../../AppSettings';
import {showMessages} from '../../../../store/actions/index';
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

                
            const inventory = {
                product: '',
                quantity: 0,
                sku: '',
                status: '',
                thresholdWarning: 0,
                thresholdCritical: 0,
                location: ''
            }

            this.convertFormToObject(inventoryForm, inventory);

            this.postInventoryToBackend(inventory);


        }else {
            this.props.onShowMessage('error', ['Forms are not valid for submission']);
        }


        
    }

    convertFormToObject(form, object) {

        for(const property in object){
            object[property] = form[property].value
        }

    }

    async postInventoryToBackend(inventoryData) {

        try{
            const uri = `${InventoryBackendAPI}/inventories`;
            const response = await axios.post(uri, inventoryData);

            if(response.status === 201){
                const createdInventory = response.data;

                this.props.history.push(`/inventories/${createdInventory.id}`);

                this.props.onShowMessage('success', ['Successfully Created Inventory']);
            }

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


    render() {

        return(
            <div className='app-row' >
            <div className='app-col app-col--80'>
                <InventoryForm  action={this.state.action}
                                onSave={this.saveInventoryHandler}
                                onCancel={() => this.props.history.goBack()} 
                                data={this.state.inventory} options={this.state.options} />
            </div>
            </div>
        )
    }

}



const mapDispatchToProps = dispatch => {
    return {
        onShowMessage: (messageType, messages) => dispatch(showMessages(messageType, messages))
    }
}

export default connect(null, mapDispatchToProps)(InventoryNew);
// export default InventoryNew;
