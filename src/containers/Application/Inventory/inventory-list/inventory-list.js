import React, {Component} from 'react';
import axios from 'axios';

import InventoryControl from './Inventory-control';
import TablePageControl from '../../../../components/TableComponent/TablePageControl';
import TableComponent from '../../../../components/TableComponent/TableComponent';
import {InventoryBackendAPI} from '../../../../AppSettings';
import LoadingComponent from '../../../../components/UI/LoadingComponent';
import withMessages from '../../../../hoc/withMessages';



const columns = [
    {name: 'SKU', value:'sku'},
    {name: 'Location', value:'location'},
    {name: 'Products', value:'product'},
    {name: 'Quantity', value:'quantity'},
    {name: 'Status', value:'status'},
    {name: '', value:'actions', link:'inventories' }
];


class InventoryList extends Component {

    state = {
        inventories: null,
        pagination: null
    }

    componentDidMount() {
       this.loadInventoriesdata()
    }


    newInventoryHandler = () => {
        this.props.history.push('/inventories/new');
    }

    changePageHander = (pageNumber: number = 1) => {

        console.log('Page Changed: ', pageNumber);

        if(this.state.pagination){
            if(pageNumber >= 1 && pageNumber <= this.state.pagination.totalPages){

                this.loadInventoriesdata(pageNumber)
            }
        }
    }

    //Load inventories based on:
    //page number
    //Sort order
    //Sort Property
    async loadInventoriesdata(pageNumber: number = 1) {
        try {
            const response = await axios.get(`${InventoryBackendAPI}/inventories?pageNumber=${pageNumber}`);
            
            const pagination = JSON.parse(response.headers.pagination);
            console.log(pagination);
            this.setState({
                ...this.state,
                inventories: response.data,
                pagination: pagination
            })

        } catch(error) {

            console.log('Error Encountered', error);
        }
    }

    renderInventoriestable(){

        return (
            <div className='app-container'>
                <InventoryControl onClickNew={this.newInventoryHandler} />
                <div className='app-row' >
                    <TableComponent columns={columns} 
                        data={this.state.inventories} match={this.props.match} />
                </div>
                <TablePageControl pagination={this.state.pagination} onPageChanged={this.changePageHander} />
            </div>
        )
    }

    render(){
        return this.state.inventories && this.state.pagination? this.renderInventoriestable() : <LoadingComponent />
    }

}

export default withMessages(InventoryList);
