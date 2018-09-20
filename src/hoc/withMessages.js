import React, {Component, Fragment} from 'react';
import AllertMessage from '../components/AllertMessageComponent/AllertMessage';


export default (ChildComponent) => {

    class ComposedComponent extends Component {


        render(){

            return(
                <Fragment>
                    <AllertMessage type='info' messages={['Test HOC Message']} />
                    <ChildComponent {...this.props} />
                </Fragment>
            )
        }
    }


    return ComposedComponent;




}