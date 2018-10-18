import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadStatusOptions, loadInventories} from '../../../../store/actions';

class InventoryFilter extends Component {

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

        if(this.props.filter !== null){

            this.setState({
                ...this.state,
                form: {
                    ...this.props.filter
                }
            })
        }
    }

    inputChangeHandler = (event) => {
       
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [name]: value
            }
        })

    }

    searchInventoriesHandler = () => {
        const filter = {
            ...this.state.form
        }

        this.props.onFilterInventories(filter);
    }

    clearFilterHandler = () => {
        this.setState({
            ...this.state,
            form: {
                status: 0,
                location: '',
                product: '',
                sku: ''
            }
        })

        this.props.onClearFilter();
        
    }

    render(){
        const options = this.props.statusOptions.map(option => {
            return <option key={option.id} value={option.id} >{ option.status }</option>
        })

        return(
            <div className='app-row ' >
               <div className='app-page__control app-page__control--3x2' >
                    <div className='app-page__control app-page__control--1x1' >
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

                    </div>
                    <div className='control-group control-group--right'>
                        <button className='app-btn' 
                            onClick={this.searchInventoriesHandler} >Search</button>
                        <button className='app-btn' 
                            onClick={this.clearFilterHandler} >Clear Filter</button>
                    </div>
               </div>
           </div>
        )
    }
}


const mapStateToProps = state => {

    return{
        statusOptions: state.inventories.statusOptions,
        filter: state.inventories.filter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadStatusOptions: () => dispatch(loadStatusOptions()),
        onLoadInventories: (pageNumber, sort, filter, callback) => dispatch(loadInventories(pageNumber, sort, filter, callback))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryFilter);