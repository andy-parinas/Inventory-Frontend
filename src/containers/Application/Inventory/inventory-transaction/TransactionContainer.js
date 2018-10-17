import React from 'react';
import {Switch, Route} from 'react-router-dom';
import TransactionList from './TransactionList';
import TransactionDetail from './TransactionDetail';
import TransactionNew from './TransactionNew';

const TransactionContainer = (props) => {

    return(
        <div className='app-row'>
            <div className='app-col app-col--80'>
            <hr />
                <Switch>  
                    <Route path='/inventories/show/:id/transactions/new' component={TransactionNew} />
                    <Route path='/inventories/show/:id/:transId' component={TransactionDetail} />
                    <Route path='/inventories/show/:id' component={TransactionList} />    
                </Switch>
            </div>
        </div>
    )
}


export default TransactionContainer;