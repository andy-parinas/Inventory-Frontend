import React, {Component, Fragment} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';
import DashboardContainer from './Dashboard/DashboardContainer';
import ProductContainer from './Product/ProductContainer';
import InventoryContainer from './Inventory/InventoryContainer';
import LinkMenu from '../../components/UI/LinkMenu';
import withMessages from '../../hoc/withMessages';
import requireAuth from '../../hoc/requireAuth';
import {logout} from '../../store/actions';

const menu = [
    {name: 'Dashboard', path: '/dashboard'},
    {name: 'Inventories', path: '/inventories'},
    {name: 'Products', path: '/products'},
]

class ApplicationContainer extends Component {

    logoutHandler = () => {
        this.props.onLogout();
    }

    render(){
        return(
            <Fragment>
                <NavigationHeader brandName='I-Manage' onLogout={this.logoutHandler} >
                    <LinkMenu menu={menu} />
                </NavigationHeader>
                <Switch>
                    <Route path='/dashboard' component={ DashboardContainer } />
                    <Route path='/products' component={ ProductContainer } />
                    <Route path='/inventories' component={ InventoryContainer } />
                    <Redirect to='/dashboard' from='/' />
                </Switch>
            </Fragment>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: (callback) => dispatch(logout(callback))
    }
}

export default connect(null, mapDispatchToProps)(requireAuth(withMessages(ApplicationContainer)));