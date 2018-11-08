import React, {Component} from 'react';


class ProductControl extends Component {

    render(){

        return(
            <div className='app-row' >
                <div className='app-page__control app-page__control--3x2' >
                    <div className='control-group' >
                        <label  className='app-form__label' htmlFor='search'>Search Products</label>
                        <input className='app-form__input app-form__input--flex' type='text'></input>
                        <button className='app-btn'>Search</button>
                        <button className='app-btn'>Advance Search</button>
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

export default ProductControl;