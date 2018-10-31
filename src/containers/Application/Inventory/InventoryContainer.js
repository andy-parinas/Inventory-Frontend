import React, {Component, Fragment} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import PageTitle from '../../../components/PageTitle/PageTitle';
import {ClipboardIcon} from '../../../components/UI/Icons';
import InventoryList from './inventory-list/InventoryList';
import InventoryDetail from './inventory-detail/InventoryDetail';
import InventoryNew from './inventory-new/InventoryNew';
import InventorySearch from './inventory-search/InventorySearch';
import LinkMenu from '../../../components/UI/LinkMenu';
import InventoryLocation from '../Inventory/inventory-location/InventoryLocation';
import LocationContainer from './inventory-location/LocationContainer';
import LocationTypes from './inventory-location/LocationTypes';


const menu = [
    {name: 'List All Inventory', path: '/inventories/all'},
    {name: 'Create New Inventory', path: '/inventories/new'},
    {name: 'Location', path: '/inventories/locations'},
    {name: 'Location Type', path: '/inventories/locationtypes'}
]

class InventoryContainer extends Component {

    render(){
        
        return(
            <Fragment>
                <div className='submenu'>
                    <LinkMenu menu={menu} />
                </div>
                
                <div className='app-page' >
                    <PageTitle title='Inventory Management' >
                        <ClipboardIcon className='page-title__icon' />
                    </PageTitle>
                    <div className='app-page__content app-page__content--80 '>
                        <Switch>
                            <Route path='/inventories/all' component={InventoryList} />
                            <Route path='/inventories/new' component={InventoryNew} />
                            <Route path='/inventories/locations' component={LocationContainer} />
                            <Route path='/inventories/locationtypes' component={LocationTypes} />
                            <Route path='/inventories/show/:id' component={InventoryDetail} />
                            <Redirect to='/inventories/all' from='/inventories' />
                        </Switch>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default InventoryContainer;