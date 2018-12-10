import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadProducts} from '../../../../store/actions'

class ProductControl extends Component {

    state = {
        productName: ''
    }

    onInputChangeHandler = (event) => {
        const value = event.target.value

        this.setState({
            ...this.state,
            productName: value
        })
    }

    onProductSearched = () => {
        this.props.onLoadProducts(1, null, this.state.productName, null)
    }

    onClearSearch = () => {
        this.props.onLoadProducts(1)
    }

    render(){

        return(
            <div className='app-row' >
                <div className='app-page__control app-page__control--3x2' >
                    <div className='control-group' >
                        <label  className='app-form__label' htmlFor='search'>Search Products</label>
                        <input 
                            onChange={this.onInputChangeHandler}
                            className='app-form__input app-form__input--flex' 
                            type='text' />
                        <button className='app-btn' onClick={this.onProductSearched} >Search</button>
                        <button className='app-btn' onClick={this.onClearSearch} >Clear Search</button>
                    </div>
                    <div className='control-group control-group--right'>
                        <button onClick={this.props.onNewProduct}
                            className='app-btn' >New Product</button>
                    </div>
                </div>
            </div>  
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onLoadProducts : (pageNumber, sort, productName, callback) => dispatch(loadProducts(pageNumber, sort, productName, callback))
    }
}

export default connect(null, mapDispatchToProps)(ProductControl);