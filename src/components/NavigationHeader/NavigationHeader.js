import React, {Component} from 'react';




class NavigationHeader extends Component {

    render(){

        return(
            <div className='row' >
                <div className='nav' >
                    <div  className='nav__brand'> { this.props.brandName } </div>
                    { this.props.children }
                </div>
            </div>
        )
    }


}

export default NavigationHeader;