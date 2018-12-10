import React, {Component} from 'react';
import {connect} from 'react-redux';

import { loadProductCategories, createProductCategory, updateProductCategory, deleteProductCategory } from '../../../../store/actions';
import EditableTable from '../../../../components/TableComponent/EditableTable/EditableTable';

const columns = [
    {name: 'Categories', value:'name', sortable: false, inputType: 'text'},
    {name: '', value:'actions', inputType:'actions' }
];


class ProductCategories extends Component {

    componentDidMount(){
        this.props.onLoadCategories();
    }

    updateCategoryHandler = (id, productCategory) => {
        this.props.onUpdateCategory(id, productCategory);
    }

    createCategoryHandler = (productCategory, callback) => {
        if(productCategory.name.trim() !== ''){

            this.props.onCreateCategory(productCategory, callback);

       }
    }

    delteCategoryHandler = (id) => {
        this.props.onDeleteCategory(id);
    }

    render(){
        return(
            <div className='app-container'>
                <div className='app-row' >
                    <h2>Product categories</h2>
                    <hr />
                    <EditableTable 
                        columns={columns} 
                        data={this.props.productCategories}
                        onAdd={this.createCategoryHandler} 
                        onUpdate={this.updateCategoryHandler}
                        onDelete={this.delteCategoryHandler} />
                </div>
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {
        productCategories: state.products.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadCategories: () => dispatch(loadProductCategories()),
        onCreateCategory: (productCategory, callback) => dispatch(createProductCategory(productCategory, callback)),
        onUpdateCategory: (id, productCategory, callback) => dispatch(updateProductCategory(id, productCategory, callback)),
        onDeleteCategory: (id, callback) => dispatch(deleteProductCategory(id, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategories);