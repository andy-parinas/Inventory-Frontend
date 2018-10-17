import React, {Component, Fragment} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import PageTitle from '../../../components/PageTitle/PageTitle';
import { QRCodeIcon } from '../../../components/UI/Icons';
import ProductList from './product-list/ProductList';
import ProductDetail from './product-detail/ProductDetail';
import ProductNew from '../Product/product-new/ProductNew';
import LinkMenu from './../../../components/UI/LinkMenu';


const menu = [
    {name: 'List All Products', path: '/products/all'},
    {name: 'Create New Product', path: '/products/new'},
    {name: 'Manage Categories', path: '/products/categories'},
    {name: 'Create Reports', path: '/products/reports'}
]

class ProductContainer extends Component{

    render(){
        return(
            <Fragment>
                <div className='submenu'>
                    <LinkMenu menu={menu} />
                </div>
                <div className='app-page' >
                    <PageTitle title='Product Management' >
                        <QRCodeIcon className='page-title__icon' />
                    </PageTitle>
                    <div className='app-page__content app-page__content--80 '>
                        <Switch>
                            <Route path='/products/all' component={ProductList} />
                            <Route path='/products/new' component={ProductNew} />
                            <Route path='/products/show/:id' component={ProductDetail} />
                            <Redirect to='/products/all' from='/products' />
                        </Switch>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ProductContainer;