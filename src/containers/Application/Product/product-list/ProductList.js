import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadProducts} from '../../../../store/actions/index';
import TableComponent from '../../../../components/TableComponent/TableComponent';
import withLoading from '../../../../hoc/withLoading';
import ProductControl from './productControl';
import TablePageControl from '../../../../components/TableComponent/TablePageControl';


const columns = [
    {name: 'Product', value:'name', sortable: true},
    {name: 'Category', value:'category', sortable: true},
    // {name: 'Descriptions', value:'descriptions', shorten: true, sortable: false},
    {name: 'Cost', value:'cost', sortable: true},
    {name: 'Price', value:'price', sortable: true},
    {name: '', value:'actions', link:'products' }
];

class ProductList extends Component {


    state = {
        sort: {
            column: 'name',
            asc: true
        }
    }

    componentDidMount(){
        this.props.onLoadProducts(1);
    }


    pageChangedHandler = (pageNumber: number = 1) => {
        if(pageNumber >= 1 && pageNumber <= this.props.pagination.totalPages){
            this.props.onLoadProducts(pageNumber);
        }
    }


    productsSortedHandler = (columnName) => {

        const columnObject = columns.find(column => {
            return column.value === columnName;
        })

        if(columnObject.sortable){
            const sort = {
                column: columnName,
                asc: columnName === this.state.sort.column? !this.state.sort.asc : true
            }

            const pageNumber = this.props.pagination.pageNumber

            this.props.onLoadProducts(pageNumber, sort, () => {
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



    }

    renderProductsTable(){
        return(
            <div className='app-container'>
                <ProductControl />
                <div className='app-row' >
                    <TableComponent
                        columns={columns} 
                        data={this.props.products}
                        sort={this.state.sort}
                        onSort={this.productsSortedHandler}
                        match={this.props.match} />
                </div>
                <TablePageControl pagination={this.props.pagination} onPageChanged={this.pageChangedHandler} />
            </div>
        )
    }

    render(){
        return this.props.products && this.props.pagination ? this.renderProductsTable() : '';
    }
}

const mapStateToProps = state => {
    return {
        products: state.products.products,
        pagination: state.products.pagination
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadProducts: (pageNumber, sort, callback) => dispatch(loadProducts(pageNumber, sort, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoading(ProductList));