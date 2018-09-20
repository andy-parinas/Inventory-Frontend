import React, {Component, Fragment} from 'react';
import AlertMessage from '../components/AlertMessageComponent/AlertMessage';


export default (ChildComponent) => {

    class ComposedComponent extends Component {


        render(){

            return(
                <Fragment>
                    <AlertMessage type='info' messages={['Test HOC Message']} />
                    <ChildComponent {...this.props} />
                </Fragment>
            )
        }
    }


    return ComposedComponent;




}