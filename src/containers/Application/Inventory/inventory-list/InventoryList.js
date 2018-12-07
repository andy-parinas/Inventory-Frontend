import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadInventories} from '../../../../store/actions';
import TablePageControl from '../../../../components/TableComponent/TablePageControl';
import TableComponent from '../../../../components/TableComponent/TableComponent';
import InventoryFilter from './InventoryFilter';
import withLoading from '../../../../hoc/withLoading';
import {ToggleDownIcon, ToggleUpIcon} from '../../../../components/UI/Icons';

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
        },
        showFilter: false
    }

    componentDidMount() {
        // if(this.props.inventories.length === 0){
        //     this.props.loadInventories(1, this.state.sort, null, null);
        // }

        this.props.loadInventories(1, this.state.sort, null, null);

        if(this.props.sort){
            this.setState({
                ...this.state,
                sort: {
                    ...this.props.sort
                }
            })
        }
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

        const filter = this.props.filter

        const sort = {
            column: columnName,
            asc: columnName === this.state.sort.column? !this.state.sort.asc : true
        }

        const pageNumber = this.props.pagination.pageNumber

        this.props.loadInventories(pageNumber, sort, filter, () => {
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

    toggleFilterHandler = () => {
        this.setState(prevState => {
           return {
               ...prevState,
               showFilter: !prevState.showFilter
           }
        })
    }

    filterInventoriesHandler = (filter) => {
        this.props.loadInventories(1, this.state.sort, filter, null)
    }

    clearFilterHandler = () => {
        this.props.loadInventories(1, this.state.sort, null, null)
    }

    renderInventoriestable(){

        const toggleIcon = this.state.showFilter?  <ToggleUpIcon className='simple-link__icon'/> : <ToggleDownIcon className='simple-link__icon'/>

        return (
            <div className='app-container'>
                <h2>Inventories Table</h2>
                <hr />
                <div className='app-toggle'>
                    <a className='simple-link' onClick={this.toggleFilterHandler} >
                        Filter Inventories
                    </a>
                    {toggleIcon}
                </div>
                {/* <hr /> */}
                <div className={`app-filter app-filter--${this.state.showFilter}`}>
                    <InventoryFilter 
                        onFilterInventories={this.filterInventoriesHandler} 
                        onClearFilter={this.clearFilterHandler} />
                </div>
                <div className='app-row' >
                    <TableComponent
                        columns={columns} 
                        data={this.props.inventories} 
                        sort={this.state.sort}
                        onSort={this.inventorySortedHandler}
                        actionLink='/inventories/show'
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
        pagination: state.inventories.pagination,
        filter: state.inventories.filter,
        sort: state.inventories.sort
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadInventories: (pageNumber, sort, search, callback) => dispatch(loadInventories(pageNumber, sort, search, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoading(InventoryList));
