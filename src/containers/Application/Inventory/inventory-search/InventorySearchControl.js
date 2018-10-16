import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadStatusOptions} from '../../../../store/actions';

class InventorySearchControl extends Component {

    state = {
        form: {
            status: 0,
            location: '',
            product: '',
            sku: ''
        }
    }

    componentDidMount(){
        this.props.onLoadStatusOptions();
    }


    inputChangeHandler = (event) => {
       
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [name]: [value]
            }
        })

    }

    resetSearhHandler = () => {
        this.setState({
            ...this.state,
            form: {
                status: 0,
                location: '',
                product: '',
                sku: ''
            }
        })

        this.props.onResetSearch();
    }


    render(){
       
        const options = this.props.statusOptions.map(option => {
            return <option key={option.id} value={option.id} >{ option.status }</option>
        })

        return(
        <div className='app-row' >
            <div className='app-page__control app-page__control--3' >
                <div className='control-group' >
                    <div className='control-group__row-elements'>
                        <label  className='app-form__label' htmlFor='search'>Locations</label>
                        <input name='location' className='app-form__input app-form__input--flex' type='text'
                            value={this.state.form.location}
                            onChange={this.inputChangeHandler}></input>
                    </div>
                </div>
                <div className='control-group' >
                    <div className='control-group__row-elements'>
                        <label  className='app-form__label' htmlFor='search'>Product</label>
                        <input name='product' className='app-form__input app-form__input--flex' type='text'
                            value={this.state.form.product}
                            onChange={this.inputChangeHandler}></input>
                    </div>
                </div>
                <div className='control-group' >
                    <div className='control-group__row-elements'>
                        <label  className='app-form__label' htmlFor='search'>SKU</label>
                        <input name='sku' className='app-form__input app-form__input--flex' type='text'
                            value={this.state.form.sku}
                            onChange={this.inputChangeHandler}></input>
                    </div>
                </div>
                <div className='control-group' >
                    <div className='control-group__row-elements'>
                        <label  className='app-form__label' htmlFor='search'>Status</label>
                        <select name='status' className='app-form__input' value={this.state.form.status}
                            onChange={this.inputChangeHandler}>
                            <option value={0} > </option>
                            {options}
                        </select>
                    </div>
                </div>
                <div className='control-group' >
                   <button className='app-btn'
                     onClick={() => this.props.onSearch(this.state.form)} >Search</button>
                    <button className='app-btn'
                     onClick={this.resetSearhHandler} >Reset</button>
                </div>
            </div>
        </div>
       )
               
    }

}

const mapStateToProps = state => {
    return {
        statusOptions: state.inventories.statusOptions
    }
}

const mapDispatchToProps = dispatch => {

    return {
        onLoadStatusOptions: () => dispatch(loadStatusOptions())
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(InventorySearchControl);