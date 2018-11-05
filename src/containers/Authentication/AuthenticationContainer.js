import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';
import {login} from '../../store/actions';
import withMessages from '../../hoc/withMessages';

class AuthenticationContainer extends Component {

    state = {
        username: '',
        password: ''
    }

    componentDidMount(){
        if(this.props.isAuthenticated) this.props.history.push('/dashboard');
    }

    inputChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    loginHandler = (event) => {
        event.preventDefault();

        this.props.onLogin(this.state, () => {
            this.props.history.push('/dashboard')
        })
    }

    render(){

        return(
           <Fragment>
               <NavigationHeader brandName='I-Manage' />
                <div className='login-page'>
                <form onSubmit={this.loginHandler} className='login-form'>
                    <div className='login-form__group'>
                        <label className='app-form__label'>Username</label>
                        <input name='username' className='app-form__input' type='text' onChange={this.inputChangeHandler} />                   
                    </div>

                    <div className='login-form__group'>
                        <label className='app-form__label'>Password</label>
                        <input name='password' className='app-form__input' type='password' onChange={this.inputChangeHandler} />                   
                    </div>
                    <button type='submit' className='app-btn' onClick={this.loginHandler}> Login </button>
                </form>
                </div>
           </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.authenticated
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogin: (userLogin, callback) => dispatch(login(userLogin, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withMessages(AuthenticationContainer));