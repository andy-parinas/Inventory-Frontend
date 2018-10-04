import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import PageTitle from '../../../components/PageTitle/PageTitle';
import { ClipboardIcon, QRCodeIcon } from '../../../components/UI/Icons';
import ProductList from './product-list/ProductList';



class ProductContainer extends Component{

    render(){
        return(
            <div className='app-page' >
                <PageTitle title='Product Management' >
                    <QRCodeIcon className='page-title__icon' />
                </PageTitle>
                <div className='app-page__content app-page__content--80 '>
                    <Switch>
                        {/* <Route path='/inventories/new' component={InventoryNew} />
                        <Route path='/inventories/:id/:action' component={InventoryDetail} />
                        <Route path='/inventories/:id' component={InventoryDetail} /> */}
                        <Route path='/products' component={ProductList} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default ProductContainer;