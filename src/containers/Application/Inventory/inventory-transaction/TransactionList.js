import React, {Component, Fragment} from 'react';
import axios from 'axios';

import {InventoryBackendAPI} from '../../../../AppSettings';
import TableComponent from '../../../../components/TableComponent/TableComponent';
import LoadingComponent from '../../../../components/UI/LoadingComponent';


const columns = [
    {name: 'Date', value:'timeStamp'},
    {name: 'Transaction', value:'transactionType'},
    {name: 'Quantity', value:'quantity'},
    {name: '', value:'actions' }
];


class TransactionList extends Component {

    state = {
        loading: true,
        transactions: []
    }

    componentDidMount() {
        this.loadData();
    }


    async loadData() {
        try { 
            const inventoryId = this.props.match.params.id
            const api = `${InventoryBackendAPI}/inventories/${inventoryId}/transactions`;

            const response = await axios.get(api);

            
            this.setState({
                ...this.state,
                transactions: response.data,
                loading: false
            })


        }catch(error) {

        }
    }


    render() {

        const transactionList = <Fragment>
                                    <h3>Transaction List</h3>
                                    <TableComponent columns={columns} 
                                            data={this.state.transactions} 
                                            match={this.props.match} />
                                </Fragment>

        return this.state.loading? <LoadingComponent /> : transactionList;
    }

}

export default TransactionList;