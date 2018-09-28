import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import LoadingOverlay from '../components/UI/Loading/LoadingOverlay';

export default (ChildComponent) => {

    class ComposedComponent extends Component {

        render(){

            return(
                <Fragment>
                    <ChildComponent {...this.props} />
                    { this.props.isLoading? <LoadingOverlay /> : ''}
                </Fragment>
            )
        }
    }

    const mapStateToProps = state => {
        return {
            isLoading: state.loading.isLoading
        }
    }


    return connect(mapStateToProps)(ComposedComponent);




}