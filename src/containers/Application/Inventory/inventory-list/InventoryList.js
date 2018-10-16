import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadInventories} from '../../../../store/actions';
import InventoryControl from './Inventory-control';
import TablePageControl from '../../../../components/TableComponent/TablePageControl';
import TableComponent from '../../../../components/TableComponent/TableComponent';
import withLoading from '../../../../hoc/withLoading';


const columns = [
    {name: 'Location', value:'location', sortable: true},
    {name: 'Products', value:'product', sortable: true},
    {name: 'SKU', value:'sku', sortable: true},
    {name: 'Quantity', value:'quantity', sortable: true},
    {name: 'Status', value:'status', sortable: true},
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
        
       this.props.loadInventories(1, this.state.sort, null, null)
    }


    newInventoryHandler = () => {
        this.props.history.push('/inventories/new');
    }

    pageChangedHandler = (pageNumber: number = 1) => {

        if(pageNumber >= 1 && pageNumber <= this.props.pagination.totalPages){
            this.props.loadInventories(pageNumber, this.state.sort, null, null);
        }
        
    }

    inventorySortedHandler = (columnName) => {

        const sort = {
            column: columnName,
            asc: columnName === this.state.sort.column? !this.state.sort.asc : true
        }

        const pageNumber = this.props.pagination.pageNumber

        this.props.loadInventories(pageNumber, sort, null, () => {
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
                <InventoryControl onClickNew={this.newInventoryHandler} 
                    onAdvanceSearch={() => this.props.history.push('/inventories/search')} />
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
        loadInventories: (pageNumber, sort, search, callback) => dispatch(loadInventories(pageNumber, sort, search, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoading(InventoryList));
