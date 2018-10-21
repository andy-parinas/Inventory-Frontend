import React, {Component} from 'react';


class InventorySearchControl extends Component {

    state = {
        inputValue: ''
    }

    inputChangeHandler = (event) => {
        this.setState({
            ...this.state,
            inputValue: event.target.value
        })
    }

    searchLocationsHandler = () => {
        
    }


    render() {

        return(
            <div className='app-row' >
               <div className='app-page__control app-page__control--3x2' >
                    <div className='control-group' >
                        <label  className='app-form__label' htmlFor='search'>Search Locations</label>
                        <input className='app-form__input app-form__input--flex' type='text' value={this.state.inputValue} onChange={this.inputChangeHandler} ></input>
                        <button className='app-btn'>Search</button>
                    </div>
               </div>
           </div>
        )
    }


}


export default InventorySearchControl;