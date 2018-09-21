import React, {Component, Fragment} from 'react';
import AlertMessage from '../components/AlertMessageComponent/AlertMessage';
import {connect} from 'react-redux';
import {hideMessages} from '../store/actions/index';

export default (ChildComponent) => {

    class ComposedComponent extends Component {

        render(){

            return(
                <Fragment>
                    <AlertMessage type={this.props.messageType} messages={this.props.messages} onDismissed={this.props.onDismissedAlert} />
                    <ChildComponent {...this.props} />
                </Fragment>
            )
        }
    }

    const mapStateToProps = state => {
        return {
            messageType: state.messages.type,
            messages: state.messages.messages
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            onDismissedAlert: () => dispatch(hideMessages())
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);




}