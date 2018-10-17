import React, {Component} from 'react';


class InventoryFilter extends Component {

    state = {
        form: {
            status: 0,
            location: '',
            product: '',
            sku: ''
        }
    }

    render(){
        // const options = this.props.statusOptions.map(option => {
        //     return <option key={option.id} value={option.id} >{ option.status }</option>
        // })
        const options = [];

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
                        <button onClick={this.props.onClickNew} 
                            className='app-btn' >Search</button>
                    </div>
               </div>
           </div>
        )
    }
}

export default InventoryFilter;