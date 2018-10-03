import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadInventories} from '../../../../store/actions/index';
import InventoryControl from './Inventory-control';
import TablePageControl from '../../../../components/TableComponent/TablePageControl';
import TableComponent from '../../../../components/TableComponent/TableComponent';
import LoadingComponent from '../../../../components/UI/LoadingComponent';
import withLoading from '../../../../hoc/withLoading';


const columns = [
    {name: 'Location', value:'location'},
    {name: 'Products', value:'product'},
    {name: 'SKU', value:'sku'},
    {name: 'Quantity', value:'quantity'},
    {name: 'Status', value:'status'},
    {name: '', value:'actions', link:'inventories' }
];


class InventoryList extends Component {

    state = {
        sort: {
            column: 'location',
            asc: true
        }
    }

    componentDidMount() {
        
       this.props.loadInventories(1, this.state.sort, null)
    }


    newInventoryHandler = () => {
        this.props.history.push('/inventories/new');
    }

    pageChangedHandler = (pageNumber: number = 1) => {

        if(pageNumber >= 1 && pageNumber <= this.props.pagination.totalPages){
            this.props.loadInventories(pageNumber, this.state.sort, null);
        }
        
    }

    inventorySortedHandler = (columnName) => {

        const sort = {
            column: columnName,
            asc: columnName === this.state.sort.column? !this.state.sort.asc : true
        }

        const pageNumber = this.props.pagination.pageNumber

        this.props.loadInventories(pageNumber, sort, () => {
            this.setState(prevState => {
                return {
                    ...this.state,
                   sort: {
                    ...sort
                   }
                }
            })
        })
    }

    renderInventoriestable(){

        return (
            <div className='app-container'>
                <InventoryControl onClickNew={this.newInventoryHandler} />
                <div className='app-row' >
                    <TableComponent
                        columns={columns} 
                        data={this.props.inventories} 
                        sort={this.state.sort}
                        onSort={this.inventorySortedHandler}
                        match={this.props.match} />
                </div>
                <TablePageControl pagination={this.props.pagination} onPageChanged={this.pageChangedHandler} />
            </div>
        )
    }

    render(){
        console.log(this.state);
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
        loadInventories: (pageNumber, sort, callback) => dispatch(loadInventories(pageNumber, sort, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoading(InventoryList));
