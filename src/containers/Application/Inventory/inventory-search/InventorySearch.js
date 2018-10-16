import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadInventories, resetInventories} from '../../../../store/actions'
import InventorySearchControl from './InventorySearchControl';
import TableComponent from '../../../../components/TableComponent/TableComponent';
import TablePageControl from '../../../../components/TableComponent/TablePageControl';
import { InventoryBackendAPI } from '../../../../AppSettings';

const columns = [
    {name: 'Location', value:'location', sortable: true},
    {name: 'Products', value:'product', sortable: true},
    {name: 'SKU', value:'sku', sortable: true},
    {name: 'Quantity', value:'quantity', sortable: true},
    {name: 'Status', value:'status', sortable: true},
    {name: '', value:'actions', link:'inventories' }
];

class InventorySearch extends Component {

    state = {
        inventories: [],
        sort: {
            column: 'location',
            asc: true
        }

    }

    componentDidMount(){
        this.props.onResetInventories();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        return {
            ...prevState,
            inventories: nextProps.inventories
        }
    }


    inventorySearchHandler = (searchForm) => {

        let search = ''
        // encodeURIComponent
        for(const property in searchForm){
            const safeValue = encodeURIComponent(searchForm[property]);
            search = search + `${property}=${safeValue}&`
        }

        const pageNumber = this.props.pagination? this.props.pagination.pageNumber : 1;
        this.props.onLoadInventories(pageNumber, this.state.sort, search, null);
    }

    searchResetHandler = () => {
        this.props.onResetInventories(() => {
            this.setState({
                ...this.state,
                inventories: [],
                sort: {
                    column: 'location',
                    asc: true
                }
            })
        })
    }

    pageChangedHandler = (pageNumber: number = 1) => {

    }

    inventorySortedHander = (columnName) => {

    }

    render(){

        const pageControl = this.props.pagination?
             <TablePageControl pagination={this.props.pagination}  onPageChanged={this.pageChangedHandler} /> : '';

        return(
            <div className='app-container'>
                <InventorySearchControl 
                    onSearch={this.inventorySearchHandler} 
                    onResetSearch={this.searchResetHandler}/>
                
                <div className='app-row' >
                   <h2> Search Results </h2>
                   <hr />
                   <TableComponent
                        columns={columns} 
                        data={this.state.inventories} 
                        sort={this.state.sort}
                        onSort={this.inventorySortedHandler}
                        match={this.props.match} />
                </div>
                {pageControl}
            
            </div>
        )
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
        onLoadInventories: (pageNumber, sort, search, callback) => dispatch(
            loadInventories(pageNumber, sort, search, callback)),
        onResetInventories: (callback) => dispatch(resetInventories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InventorySearch);