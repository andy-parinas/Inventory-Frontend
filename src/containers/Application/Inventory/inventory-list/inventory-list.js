import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadInventories} from '../../../../store/actions/index';
import InventoryControl from './Inventory-control';
import TablePageControl from '../../../../components/TableComponent/TablePageControl';
import TableComponent from '../../../../components/TableComponent/TableComponent';
import LoadingComponent from '../../../../components/UI/LoadingComponent';
import withLoading from '../../../../hoc/withLoading';


const columns = [
    {name: 'SKU', value:'sku'},
    {name: 'Location', value:'location'},
    {name: 'Products', value:'product'},
    {name: 'Quantity', value:'quantity'},
    {name: 'Status', value:'status'},
    {name: '', value:'actions', link:'inventories' }
];


class InventoryList extends Component {


    componentDidMount() {
        
       this.props.loadInventories(1)
    }


    newInventoryHandler = () => {
        this.props.history.push('/inventories/new');
    }

    pageChangedHandler = (pageNumber: number = 1) => {

        if(pageNumber >= 1 && pageNumber <= this.props.pagination.totalPages){
            this.props.loadInventories(pageNumber);
        }
        
    }

    renderInventoriestable(){

        return (
            <div className='app-container'>
                <InventoryControl onClickNew={this.newInventoryHandler} />
                <div className='app-row' >
                    <TableComponent columns={columns} 
                        data={this.props.inventories} match={this.props.match} />
                </div>
                <TablePageControl pagination={this.props.pagination} onPageChanged={this.pageChangedHandler} />
            </div>
        )
    }

    render(){

        return this.props.inventories && this.props.pagination? this.renderInventoriestable() : ''

    }

}

const mapStateToProps = state => {
    return {
        inventories: state.inventories.inventories,
        pagination: state.inventories.pagination
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadInventories: (pageNumber) => dispatch(loadInventories(pageNumber))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoading(InventoryList));
