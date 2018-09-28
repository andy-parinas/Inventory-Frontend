import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import {loadTransactions} from '../../../../store/actions/index';

import {InventoryBackendAPI} from '../../../../AppSettings';
import TableComponent from '../../../../components/TableComponent/TableComponent';
// import LoadingComponent from '../../../../components/UI/LoadingComponent';
import InventoryTitleControl from '../InventoryTitleControl';


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
        // this.loadData();
        const inventoryId = this.props.match.params.id;
        this.props.onLoadTransactions(inventoryId, 1);

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


    newButtonHandler = () => {
        this.props.history.push(`${this.props.match.params.id}/transactions/new`);
    }


    render() {
        const titleButtons = [
            {name: 'Add Transaction', action: this.newButtonHandler}
        ]

        const transactionList = <Fragment>
                                    <InventoryTitleControl  title='Transaction Detail'
                                        buttons={titleButtons} 
                                        showButton={true} />
                                    <TableComponent columns={columns} 
                                            data={this.props.transactions} 
                                            match={this.props.match} />
                                </Fragment>

        // return this.state.loading? <LoadingComponent /> : transactionList;

        return transactionList;
    }

}

const mapStateToProps = state => {
    return {
        transactions: state.transactions.transactions,
        pagination: state.transactions.pagination
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadTransactions: (inventoryId, pageNumber) => dispatch(loadTransactions(inventoryId, pageNumber))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(TransactionList);