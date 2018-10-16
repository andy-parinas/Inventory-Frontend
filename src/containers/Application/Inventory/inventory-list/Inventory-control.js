import React, {Component} from 'react';


class InventoryControl extends Component {


    render(){

        return(
           <div className='app-row' >
               <div className='app-page__control app-page__control--3x2' >
                    <div className='control-group' >
                        <label  className='app-form__label' htmlFor='search'>Search Inventories</label>
                        <input className='app-form__input app-form__input--flex' type='text'></input>
                        <button className='app-btn'>Search</button>
                        <button className='app-btn' onClick={this.props.onAdvanceSearch} >Advance Search</button>
                    </div>
                    <div className='control-group control-group--right'>
                        <button onClick={this.props.onClickNew} 
                            className='app-btn' >New Inventory</button>
                        <button className='app-btn'>Create Report</button>
                    </div>
               </div>
           </div>
        )
    }
}

export default InventoryControl;