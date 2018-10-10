import React, {Component} from 'react';
import {connect} from 'react-redux';

import ProductForm  from '../product-form/ProductForm';
import {validateForm} from '../../../../helpers/helpers';
import {createProduct, showMessages} from '../../../../store/actions';


class ProductNew extends Component {

    state = {
        action: 'new'
    }

    productSavedHandler = (ProductForm) => {

        if(validateForm(ProductForm)){
            this.props.onCreateProduct(ProductForm, (productId) => {
                this.props.history.push(`/products/${productId}`)
            })
        }else {
            this.props.onShowMessage('error', ['Forms are not valid for submission']);
        }
    }

    productEditCancelledHandler = () => {
        this.props.history.push('/products');
    }

    render(){

        return(
            <div className='app-row' >
                <div className='app-col app-col--80'>
                <ProductForm                            
                            action={this.state.action}
                            onSaved={this.productSavedHandler} 
                            onEditCancelled={this.productEditCancelledHandler}/>
                </div>
            </div>
        )
    }


}

// const mapStateToProps = state => {
//     return {
//         product: state.product.product
//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        onCreateProduct: (ProductForm, calllback) => dispatch(createProduct(ProductForm, calllback)),
        onShowMessage: (messageType, messages) => dispatch(showMessages(messageType, messages))
    }
}

export default connect(null, mapDispatchToProps)(ProductNew);