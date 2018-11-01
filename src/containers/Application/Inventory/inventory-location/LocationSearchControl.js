import React, {Component} from 'react';

class InventorySearchControl extends Component {

    state = {
        name: ''
    }

    inputChangeHandler = (event) => {
        this.setState({
            ...this.state,
            name: event.target.value
        })
    }


    render() {

        return(
            <div className='app-row' >
               <div className='app-page__control app-page__control--3x2' >
                    <div className='control-group' >
                        <label  className='app-form__label' htmlFor='search'>Search Locations</label>
                        <input className='app-form__input app-form__input--flex' type='text' 
                                value={this.state.name} onChange={this.inputChangeHandler} ></input>
                        <button className='app-btn' onClick={() => this.props.onSearch(this.state)} >Search</button>
                    </div>
               </div>
           </div>
        )
    }


}


export default InventorySearchControl;