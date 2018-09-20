import React, {Fragment} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';
import DashboardContainer from './Dashboard/DashboardContainer';
import ProductContainer from './Product/ProductContainer';
import InventoryContainer from './Inventory/InventoryContainer';
import LinkMenu from '../../components/UI/LinkMenu';
import withMessages from '../../hoc/withMessages';

const ApplicationContainer = () => {

    const menu = [
        {name: 'Dashboard', path: '/dashboard'},
        {name: 'Inventories', path: '/inventories'},
        {name: 'Products', path: '/products'},
    ]

    return(
        <Fragment>
            <NavigationHeader brandName='I-Manage' >
                <LinkMenu menu={menu} />
            </NavigationHeader>
            <Switch>
                <Route path='/dashboard' component={ DashboardContainer } />
                <Route path='/product' component={ ProductContainer } />
                <Route path='/inventories' component={ InventoryContainer } />
                <Redirect to='/dashboard' from='/' />
            </Switch>
        </Fragment>
    )

}

export default withMessages(ApplicationContainer);