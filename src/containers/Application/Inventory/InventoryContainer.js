import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import PageTitle from '../../../components/PageTitle/PageTitle';
import {ClipboardIcon} from '../../../components/UI/Icons';
import InventoryList from './inventory-list/inventory-list';
import InventoryDetail from './inventory-detail/InventoryDetail';
import InventoryNew from './inventory-new/InventoryNew';

class InventoryContainer extends Component {

    render(){
        
        return(
            <div className='app-page' >
                <PageTitle title='Inventory Management' >
                    <ClipboardIcon className='page-title__icon' />
                </PageTitle>
                <div className='app-page__content app-page__content--80 '>
                    <Switch>
                        <Route path='/inventories/new' component={InventoryNew} />
                        <Route path='/inventories/:id/:action' component={InventoryDetail} />
                        <Route path='/inventories/:id' component={InventoryDetail} />
                        <Route path='/inventories' component={InventoryList} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default InventoryContainer;