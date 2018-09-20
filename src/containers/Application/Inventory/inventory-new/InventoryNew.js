import React, {Component} from 'react';
import axios from 'axios';

import InventoryForm from '../inventory-form/InventoryForm';
import {InventoryBackendAPI} from '../../../../AppSettings';

class InventoryNew extends Component {

    state = {
        action: 'new',
        options: [
            'Option1',
            'Option2'
        ]
    }


    saveInventoryHandler = (inventoryForm) => {

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

                this.props.history.push(`/inventories/${createdInventory.id}`, {message: {type: 'success', details: 'Inventory successfully created'}});

                console.log('Success');
            }

        }catch(error) {
            console.log(error);
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

export default InventoryNew;
