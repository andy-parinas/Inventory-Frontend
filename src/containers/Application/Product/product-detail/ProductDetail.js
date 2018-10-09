import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import ProductForm from '../product-form/ProductForm';
import withLoading from '../../../../hoc/withLoading';
import {loadProduct, showMessages, updateProduct, deleteProduct} from '../../../../store/actions/index';
import {validateForm} from '../../../../helpers/helpers';

class ProductDetail extends Component {

    state = {
        action: 'details',
        reload: false
    }

    componentDidMount() {

        const productId = this.props.match.params.id;

        this.props.onLoadProduct(productId);

    }

    productEditHander = () => {
        this.setState({
            ...this.state,
            action: 'edit',
            reload: false
        })
    }

    productEditCancelledHandler = () => {
        this.setState({
            ...this.state,
            action: 'details',
            reload: true
        })
    }

    productDeleteHandler = () => {
        this.setState({
            ...this.state,
            action: 'delete'
        })
    }


    productDeleteCancelledHandler = () => {
        this.setState({
            ...this.state,
            action: 'details'
        })
    }

    productDeleteConfirmedHander = () => {

        const productId = this.props.match.params.id;

        this.props.onDeleteProduct(productId, () =>{
            this.props.history.push('/products');
        })
    }
    
    productSavedHandler = (productForm) => {

        if(validateForm(productForm)){

            const productId = this.props.match.params.id;

            this.props.onUpdateProduct(productId, productForm, () => {
                this.setState({
                    ...this.state,
                    action: 'detail'
                })
            })

        }else {

            this.props.onShowMessage('error', ['Form not valid for submission']);

        }


    }

    product

    render(){
        
        return(
            <Fragment>
                <div className='app-row' >
                    <div className='app-col app-col--80'>
                        <ProductForm 
                            data={this.props.product}
                            action={this.state.action}
                            reload={this.state.reload}
                            onEdit={this.productEditHander} 
                            onSaved={this.productSavedHandler} 
                            onDelete={this.productDeleteHandler}
                            onEditCancelled={this.productEditCancelledHandler} 
                            onDeleteCancelled={this.productDeleteCancelledHandler} 
                            onDeleteConfirmed={this.productDeleteConfirmedHander} />
                    </div>
                </div>
            </Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        product: state.products.product
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onLoadProduct: (productId) => dispatch(loadProduct(productId)),
        onUpdateProduct: (productId, productForm, callback) => dispatch(updateProduct(productId,productForm, callback)),
        onDeleteProduct: (productId, callback) => dispatch(deleteProduct(productId, callback)),
        onShowMessage: (messageType, messages) => dispatch(showMessages(messageType, messages))
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(withLoading(ProductDetail));