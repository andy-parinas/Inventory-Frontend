import React, {Component} from 'react';

import PageTitle from '../../../components/PageTitle/PageTitle';
import WidgetSection from './WidgetSection';
import {SphereIcon} from '../../../components/UI/Icons';

class DashboardContainer extends Component {

    render(){

        return(
            <div className='row' >
                <PageTitle title='Dashboard' >
                    <SphereIcon className='page-title__icon' />
                </PageTitle>
                <WidgetSection />
            </div>
        )
    }

}

export default DashboardContainer;