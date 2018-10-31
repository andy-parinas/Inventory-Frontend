import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadLocationTypes, deleteLocationType} from '../../../../store/actions';
import EditableTable from '../../../../components/TableComponent/EditableTable/EditableTable';
import { createLocationType, updateLocationType } from '../../../../store/actions';


const columns = [
    {name: 'Location Types', value:'name', sortable: false, inputType: 'text'},
    {name: '', value:'actions', inputType:'actions' }
];

class LocationTypes extends Component {

    componentDidMount(){
        this.props.onLoadLocationTypes();
    }

    updateLocationTypeHandler = (id, locationType) => {
        if(locationType.name.trim() !== ''){

            this.props.onUpdateLocationType(id, locationType);

       }
    }

    createLocationTypeHandler = (locationType, callback) => {

       if(locationType.name.trim() !== ''){

            this.props.onCreateLocationType(locationType, callback);

       }

    }

    delteLocationTypeHandler = (id) => {
        this.props.onDeleteLocationType(id);
    }

    render(){

        return(
            <div className='app-container'>
                <div className='app-row' >
                    <h2>Location Types</h2>
                    <hr />
                    <EditableTable 
                        columns={columns} 
                        data={this.props.locationTypes}
                        onUpdate={this.updateLocationTypeHandler} 
                        onAdd={this.createLocationTypeHandler} 
                        onUpdate={this.updateLocationTypeHandler} onDelete={this.delteLocationTypeHandler} />
                </div>
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {
        locationTypes: state.locations.locationTypes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadLocationTypes: () => dispatch(loadLocationTypes()),
        onCreateLocationType: (locationType, callback) => dispatch(createLocationType(locationType, callback)),
        onUpdateLocationType: (id, locationType, callback) => dispatch(updateLocationType(id, locationType, callback)),
        onDeleteLocationType: (id, callback) => dispatch(deleteLocationType(id, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationTypes);