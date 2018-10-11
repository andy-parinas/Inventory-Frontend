import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';

import PageTitle from '../../../components/PageTitle/PageTitle';
import WidgetSection from './WidgetSection';
import {SphereIcon} from '../../../components/UI/Icons';

class DashboardContainer extends Component {

    render(){

        return(
            <div className='app-page' >
                <PageTitle title='Dashboard' >
                    <SphereIcon className='page-title__icon' />
                </PageTitle>
                <div className='app-page__content app-page__content--80 '>
                    <div className='app-layout app-layout--2x2'>
                        <div className='dashboard-section' >
                            <h2>Inventories Management</h2>
                            <div className='dashboard-section__body'>
                                <div className='dashboard-section__menu'>
                                    <Link to='/inventories/new' className='dashboard-section__link'href="">Create New Inventory</Link>
                                    <Link to='/inventories/reports' className='dashboard-section__link'href="">Create Inventory Report</Link>
                                    <Link to='/inventories' className='dashboard-section__link'href="">List All Inventory</Link>
                                    <Link to='/inventories' className='dashboard-section__link'href="">List Critical Level Inventories</Link>
                                    <Link to='/inventories' className='dashboard-section__link'href="">List Warning Level Inventories</Link>
                                    <Link to='/inventories' className='dashboard-section__link'href="">List No Stock Level Inventories</Link>
                                    <Link to='/inventories' className='dashboard-section__link'href="">List Deleted Inventories</Link>
                                    <Link to='/inventories/locations' className='dashboard-section__link'href="">Manage Inventory Locations</Link>
                                    <Link to='/inventories/search' className='dashboard-section__link'href="">Search Inventories</Link>
                                </div>
                            </div>
                        </div>
                        <div className='dashboard-section'>
                            <h2>Products Management</h2>
                            <div className='dashboard-section__body'>
                                <div className='dashboard-section__menu'>
                                    <Link to='/products/new' className='dashboard-section__link'href="">Create New Product</Link>
                                    <Link to='/products/report' className='dashboard-section__link'href="">Create Product Reports</Link>
                                    <Link to='/products' className='dashboard-section__link'href="">List All Products</Link>
                                    <Link to='/products' className='dashboard-section__link'href="">List Deleted Products</Link>
                                    <Link to='/products/categories' className='dashboard-section__link'href="">Manage Product Categories</Link>
                                    <Link to='/products/search' className='dashboard-section__link'href="">Search Products</Link>
                                </div>
                            </div>
                        </div>
                        <div className='dashboard-section'>
                            <h2>User Management</h2>
                            <div className='dashboard-section__body'>
                                <Link to='/users/new' className='dashboard-section__link'href="">Add New User</Link>
                                <Link to='/users' className='dashboard-section__link'href="">List All Users</Link>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        )
    }

}

export default DashboardContainer;