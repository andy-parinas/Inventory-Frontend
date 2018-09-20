import React from 'react';
import {Switch, Route} from 'react-router-dom';
import TransactionList from './TransactionList';
import TransactionDetail from './TransactionDetail';

const TransactionContainer = (props) => {

    return(
        <div className='app-row'>
            <div className='app-col app-col--80'>
            <hr />
                <Switch>
                    <Route path='/inventories/:id/:transId/:transAction' component={TransactionDetail} />
                    <Route path='/inventories/:id/:transId' component={TransactionDetail} />
                    <Route path='/inventories/:id' component={TransactionList} />
                </Switch>
            </div>
        </div>
    )
}


export default TransactionContainer;