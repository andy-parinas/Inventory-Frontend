import React, {Component} from 'react';
import {connect} from 'react-redux';




class NavigationHeader extends Component {


    render(){

        let userProfile = ''

        if(this.props.isAuthenticated){
            userProfile = (
                <div className='nav__profile'>
                    <div className='profile-text'>Hello, {this.props.userName } </div>
                    <button className='btn-logout' onClick={this.props.onLogout}> Logout</button>
                </div>
            )
        }

        return(
            <div className='row' >
                <div className='nav' >
                    <div  className='nav__brand'> { this.props.brandName } </div>
                    { this.props.children }
                    { userProfile }       
                </div>
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.authenticated,
        userName: state.auth.userName
    }
}

export default connect(mapStateToProps)(NavigationHeader);