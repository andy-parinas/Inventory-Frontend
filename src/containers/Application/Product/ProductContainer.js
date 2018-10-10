import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import PageTitle from '../../../components/PageTitle/PageTitle';
import { QRCodeIcon } from '../../../components/UI/Icons';
import ProductList from './product-list/ProductList';
import ProductDetail from './product-detail/ProductDetail';
import ProductNew from '../Product/product-new/ProductNew';


class ProductContainer extends Component{

    render(){
        return(
            <div className='app-page' >
                <PageTitle title='Product Management' >
                    <QRCodeIcon className='page-title__icon' />
                </PageTitle>
                <div className='app-page__content app-page__content--80 '>
                    <Switch>
                        {/* <Route path='/inventories/:id/:action' component={InventoryDetail} /> */}
                        <Route path='/products/new' component={ProductNew} />
                        <Route path='/products/:id' component={ProductDetail} />
                        <Route path='/products' component={ProductList} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default ProductContainer;